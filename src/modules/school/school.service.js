import bcryptjs from 'bcryptjs';
import eventBus from '../../lib/eventBus.js';
import { SCHOOL_EVENTS } from './school.events.js';
import { createAdminRepo,
          getAdminRepo,

        } from './school.repository.js';




// add create admin

/**
 * 
 * @param {Object} payload 
  * @param {string} payload.email - Admin email
 * @param {string} payload.name - Admin name
 * @param {string} payload.password - Admin password
 * @returns {Promise<Object>} Created admin object
 * @throws {Error} If admin with the same email already exists    
  */
export async function createAdmin(payload){
    const { email, name, password } = payload;
    // check if admin already exists
    const existingAdmin = await getAdminRepo(email);
    if (existingAdmin) {
        throw new Error('CONFLICT: Admin already exists');
    }
    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);
    // create admin
    const admin = await createAdminRepo({
        email,
        name,
        password: hashedPassword,
    });
    // emit event
    eventBus.emit(SCHOOL_EVENTS.ADMIN_CREATED, {
        id: admin.id,
        email: admin.email,
        name: admin.name,
    });
    const {_password, ...saveAdmin} = admin;
    return saveAdmin;
}