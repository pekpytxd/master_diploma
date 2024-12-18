import {sendDeleteRequest, sendGetRequest, sendPostRequest, sendPutRequest} from "@/services/api-client";

const endpoint = '/announcements'

export async function getAllAnnouncements() {
    return await sendGetRequest(endpoint);
}

export async function createAnnouncement(body) {
    await sendPostRequest(endpoint, body);
}

export async function getAnnouncement(id) {
    const url = `/announcements/${id}`;
    return await sendGetRequest(url);
}

export async function deleteAnnouncement(id) {
    await sendDeleteRequest(endpoint, id);
}

export async function editAnnouncement(body) {
    await sendPutRequest(endpoint, body);
}
