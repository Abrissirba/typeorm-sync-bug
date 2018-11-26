import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { Session } from './entity';
import { SessionSettings } from './entity/session-settings.entity';

let connection: Connection;

const config = require('../ormconfig.json');
console.log(config);

export async function getConnection() {
    if (connection) {
        return connection;
    }

    connection = await createConnection(config);
    if (!connection.isConnected) {
        await connection.connect();
    }
    return connection;
}

export async function addSession(connectionId) {
    const connection = await getConnection();

    const existing = await connection.getRepository(Session).findOne({ where: { connectionId: connectionId} });
    if (existing) {
        return existing;
    }

    let session = new Session();

    session.title = 'Test';

    session = await connection.getRepository(Session).save(session);

    let settings = new SessionSettings();
    settings.id = session.id;
    settings = await connection.getRepository(SessionSettings).save(settings);
    session.settings = settings;
    return session;
}

export async function setup() {
    const session = await addSession('123422');
}
console.log('START');
setup().then(() => {
    console.log('COMPLETED');
})