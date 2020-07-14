var rooms = []

function createRoom(id) {
  const room = {id, users: [], timer: 0, state: 'ongoing'}
  rooms.push(room)
  return room
}

function incrementAllRooms() {
  for(var i = 0; i < rooms.length;i ++) {
    if(rooms[i].timer >= 5) {
      rooms[i].state = rooms[i].state === 'ongoing' ? 'waiting' : 'ongoing'
      rooms[i].timer = 0
    } else {
      rooms[i].timer ++
    }
  }
  return rooms  
}

function userJoinRoom(id, username, room_id) {
  var index = rooms.findIndex(room => room.id === room_id)
  const user = {id, username, room: room_id}
  if(index !== -1) {
    rooms[index].users.push(user)
    return user
  } else {
    const room = {id: room_id, users: [user], timer: 0, state: 'ongoing'}
    rooms.push(room)
    return user
  }
}

function getRoomData(room_id) {
  return rooms.find(room => room.id === room_id)
}

function userLeave(id) {
  for(var i = 0; i < rooms.length; i++) {
    var index = rooms[i].users.findIndex(user => user.id === id)
    if(index !== -1) {
      rooms[i].users.splice(index, 1)[0]
    }
  }
  return rooms
 
}

module.exports = {
  createRoom, 
  userJoinRoom,
  getRoomData,
  incrementAllRooms,
  userLeave
}