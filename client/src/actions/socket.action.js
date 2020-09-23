import messageSchema from "../schemas/message.schema";
import { validate } from "json-schema";
import roomSchema from "../schemas/room.schema";
const SERVER_MESSAGE_RECEIVED = {
    type: "SERVER_MESSAGE_RECEIVED",
    schema: {
        type: "object",
        properties: {
            serverId: {
                type: "string",
                required: true,
            },
            roomId: {
                type: "string",
                required: "true",
            },
            data: messageSchema,
        },
    },
};

const NEW_ROOM_CREATED = {
    type: "NEW_ROOM_CREATED",
    schema: {
        type: "object",
        properties: {
            serverId: {
                type: "string",
                required: true,
            },
            data: roomSchema,
        },
    },
};

export const socketActions = {
    SERVER_MESSAGE_RECEIVED,
    NEW_ROOM_CREATED,
};
/**
 * Checking if action is valid and defined into socketActions
 * @param {*} action
 * @return {{valid:boolean,error:string}}
 */
export const isValid = (action) => {
    if (typeof action !== "object" || typeof action.type !== "string")
        return {
            valid: false,
            error: `action must be plain object with type property, received ${typeof action}`,
        };
    if (!socketActions.hasOwnProperty(action.type))
        return {
            valid: false,
            error: `action ${action.type} not defined in client side`,
        };
    if (!socketActions[action.type].schema) return { valid: true, error: null };
    const v = validate(action.payload, socketActions[action.type].schema);
    return { valid: v.valid, error: v.errors };
};
