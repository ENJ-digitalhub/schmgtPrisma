const isHttpPage = /^https?:$/.test(window.location.protocol);
const defaultApiBase = isHttpPage ? window.location.origin : 'http://localhost:5000';
const apiBaseInput = document.querySelector('#apiBaseUrl');
const clearResponseButton = document.querySelector('#clearResponse');
const responseStatus = document.querySelector('#responseStatus');
const responseOutput = document.querySelector('#responseOutput');
const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const sessionButtons = document.querySelectorAll('[data-session-action]');
const idleResponseCopy = 'No request sent yet.';

const storedApiBase = window.localStorage.getItem('sms-api-base');

function normalizeApiBase(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return defaultApiBase;
  }

  try {
    const base = isHttpPage ? window.location.origin : defaultApiBase;
    return new URL(trimmed, base).origin;
  } catch {
    return defaultApiBase;
  }
}

function getApiBase() {
  const normalized = normalizeApiBase(apiBaseInput.value);

  apiBaseInput.value = normalized;
  window.localStorage.setItem('sms-api-base', normalized);

  return normalized;
}

apiBaseInput.value = normalizeApiBase(storedApiBase || defaultApiBase);
window.localStorage.setItem('sms-api-base', apiBaseInput.value);

function setResponseState(label, tone, payload = idleResponseCopy) {
  responseStatus.textContent = label;
  responseStatus.dataset.tone = tone;
  responseOutput.textContent =
    typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2);
}

function resetResponsePanel() {
  if (window.location.protocol === 'file:') {
    setResponseState(
      'Open from the API server',
      'error',
      'For signup and cookie-based auth to work, open this page from http://localhost:5000/auth-console instead of the file system.'
    );
    return;
  }

  setResponseState('Waiting for a request', 'idle');
}

function getFormPayload(form) {
  return Object.fromEntries(new FormData(form).entries());
}

async function runWithButtonState(button, task) {
  const originalLabel = button.textContent;

  button.disabled = true;
  button.textContent = 'Working...';

  try {
    return await task();
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

async function sendRequest(path, options = {}) {
  const { method = 'GET', body, pendingLabel = 'Contacting API' } = options;
  const requestOptions = {
    credentials: 'include',
    method,
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
    requestOptions.headers = {
      'Content-Type': 'application/json',
    };
  }

  setResponseState(`${pendingLabel}...`, 'pending', 'Waiting for server response...');

  try {
    const response = await fetch(`${getApiBase()}${path}`, requestOptions);
    const rawBody = await response.text();
    let payload = rawBody;

    try {
      payload = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      payload = rawBody || {};
    }

    setResponseState(
      `${response.status} ${response.statusText}`,
      response.ok ? 'success' : 'error',
      payload
    );

    if (!response.ok) {
      throw new Error(
        typeof payload === 'object' && payload?.message
          ? payload.message
          : `${response.status} ${response.statusText}`
      );
    }

    return payload;
  } catch (error) {
    if (error instanceof TypeError) {
      setResponseState(
        'Network error',
        'error',
        `Unable to reach ${getApiBase()}. Make sure the API server is running.`
      );
    }

    throw error;
  }
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = event.submitter;
  const payload = getFormPayload(loginForm);

  try {
    await runWithButtonState(submitButton, async () => {
      await sendRequest('/api/auth/login', {
        body: payload,
        method: 'POST',
        pendingLabel: 'Logging in',
      });
    });
  } catch {
    return;
  }
});

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = event.submitter;
  const payload = getFormPayload(registerForm);

  try {
    await runWithButtonState(submitButton, async () => {
      await sendRequest('/api/auth/register', {
        body: payload,
        method: 'POST',
        pendingLabel: 'Creating account',
      });
    });
  } catch {
    return;
  }
});

sessionButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const action = button.dataset.sessionAction;
    const requests = {
      logout: {
        method: 'POST',
        path: '/api/auth/logout',
        pendingLabel: 'Logging out',
      },
      me: {
        path: '/api/auth/me',
        pendingLabel: 'Fetching current user',
      },
      refresh: {
        method: 'POST',
        path: '/api/auth/refresh',
        pendingLabel: 'Refreshing access token',
      },
    };

    const request = requests[action];

    try {
      await runWithButtonState(button, async () => {
        await sendRequest(request.path, request);
      });
    } catch {
      return;
    }
  });
});

clearResponseButton.addEventListener('click', resetResponsePanel);
apiBaseInput.addEventListener('change', () => {
  apiBaseInput.value = getApiBase();
});

resetResponsePanel();
