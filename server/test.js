let channel = [{
    state: {
        members: {
            '377fd382-96c5-4d7f-85bd-a9d5cafba99f': {
                user_id: '377fd382-96c5-4d7f-85bd-a9d5cafba99f',
                user: [Object],
                created_at: '2023-10-10T15:54:57.379724Z',
                updated_at: '2023-10-10T15:54:57.379724Z',
                banned: false,
                shadow_banned: false,
                role: 'member',
                channel_role: 'channel_member'
            },
            'b2a32ff1-1be8-48ff-a103-4287e3ea080b': {
                user_id: 'b2a32ff1-1be8-48ff-a103-4287e3ea080b',
                user: [Object],
                created_at: '2023-10-10T15:54:57.379724Z',
                updated_at: '2023-10-10T15:54:57.379724Z',
                banned: false,
                shadow_banned: false,
                role: 'owner',
                channel_role: 'channel_member'
            }
        }
    }
}, {
    state: {
        members: {
            '875cf0cf-1077-41cb-86cf-294b8a80d3a9': {
                user_id: '875cf0cf-1077-41cb-86cf-294b8a80d3a9',
                user: {
                    id: '875cf0cf-1077-41cb-86cf-294b8a80d3a9',
                    role: 'user',
                    created_at: '2023-10-10T16:00:39.172038Z',
                    updated_at: '2023-10-10T16:00:39.172855Z',
                    last_active: '2023-10-10T16:00:39.172038Z',
                    banned: false,
                    online: true,
                    name: 'jj'
                },
                created_at: '2023-10-10T16:00:51.071726Z',
                updated_at: '2023-10-10T16:00:51.071726Z',
                banned: false,
                shadow_banned: false,
                role: 'member',
                channel_role: 'channel_member'
            },
            '9bd1061e-894e-4f45-af62-ac6029d89e7f': {
                user_id: '9bd1061e-894e-4f45-af62-ac6029d89e7f',
                user: {
                    id: '9bd1061e-894e-4f45-af62-ac6029d89e7f',
                    role: 'user',
                    created_at: '2023-10-10T16:00:45.910402Z',
                    updated_at: '2023-10-10T16:00:45.91229Z',
                    last_active: '2023-10-10T16:00:45.910402Z',
                    banned: false,
                    online: true,
                    name: null
                },
                created_at: '2023-10-10T16:00:51.071726Z',
                updated_at: '2023-10-10T16:00:51.071726Z',
                banned: false,
                shadow_banned: false,
                role: 'owner',
                channel_role: 'channel_member'
            }
        }
    }
}
]
const users=  [
  {
    id: '377fd382-96c5-4d7f-85bd-a9d5cafba99f',
    role: 'user',
    created_at: '2023-10-10T15:54:51.408074Z',
    updated_at: '2023-10-10T15:54:51.408998Z',
    last_active: '2023-10-10T15:54:51.408074Z',
    banned: false,
    online: false,
    shadow_banned: false,
    name: null
  },
  {
    id: 'b2a32ff1-1be8-48ff-a103-4287e3ea080b',
    role: 'user',
    created_at: '2023-10-10T15:54:34.291869Z',
    updated_at: '2023-10-10T15:54:34.292901Z',
    last_active: '2023-10-10T15:54:34.291869Z',
    banned: false,
    online: false,
    shadow_banned: false,
    name: 'jj'
  }
]
let notplayerid=['b2a32ff1-1be8-48ff-a103-4287e3ea080b',  '377fd382-96c5-4d7f-85bd-a9d5cafba99f'
]
let notonlinePlayers = users.filter((ele) => {
      return ele.online
    })
notonlinePlayers.map((ele)=>{
    notplayerid.push(ele.id)
})
    
    
    console.log("notonlinePlayers:",notplayerid)

const filtered=channel.filter((channelMember)=>{
    let mem = Object.keys(channelMember.state.members)
    console.log("mem:",mem)
    return !mem.some((ele)=>{
        return notplayerid.includes(ele)
    })
})
filtered.map((ele)=>{
    console.log("filtered:",ele)
})
