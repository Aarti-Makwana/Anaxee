import api from './api'

export async function listUsers() {
  try {
    const res = await api.get('/user/allusers')
    return res.data
  } catch (err) {
    console.log(err);
    if (err.status === 401) {
      return { success: false, message: "Unauthorized" }
    }
    return { success: false, message: "User listing failed" }
  }
}

export async function updateUser(id, payload) {
  try {
    const res = await api.put(`/user/${id}`, payload)
    return res.data
  } catch (err) {
    alert(err?.response?.message || 'User update failed')
  }
}


export async function getUser(id) {
  try {
    const res = await api.get(`/user/${id}`)
    return res.data
  } catch (err) {
    alert(err?.response?.message || 'User retrieval failed')
  }
}
