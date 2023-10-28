const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { StreamChat } = require('stream-chat')
const { v4 } = require('uuid');
const { default: axios } = require('axios');
const app = express();

app.use(cors());
app.use(express.json());
const api_key = "r6yq8umwd7xe";
const api_secret =
  "hk7fa3nxu27suqu49dqwz23z8tpd37y6htazfqx2n35t4fkttmqtqfukyvgpf5dv";
const serverClient = StreamChat.getInstance(api_key, api_secret);
let tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);
console.log("tomorrow => ", tomorrow);
setInterval( ()=>{
//     const  {users}  = await serverClient.queryUsers({});
//     const filterList=users.map((ele)=>{
//         let tday=new Date()
//         let expire=new Date()
//         expire.setDate( new Date(ele.created_at).getDate() + 1);
//         if(tday<expire)
//         return ele.id
//     })
//     console.log('filterList: ', filterList);

//     // let response = await serverClient.deleteUsers(['userID1', 'userID2'], {
//     //     user: 'soft',
//     //     messages: 'hard',
//     // });

//     // response = await serverClient.getTask(response['task_id']);

//     // if(response['status'] === 'completed') {
//     //     // success!
//     // }

deleteChannel()

},3600000)

setInterval( ()=>{
    axios.post("https://ti-vade.onrender.com/join")
    console.log("trigger");
},300000)


app.get("/deleteuser", async (req, res) => {
  try {


    const { users } = await serverClient.queryUsers({ role: "user" });
    let notonlinePlayers = users.filter((ele) => {
      return !ele.online
    })
    notonlinePlayers.splice(0, 5).map(async (ele) => {
      let id = ele.id.toString()
      console.log('id: ', id);
      const responce = await serverClient.deleteUser(id, {
        delete_conversation_channels: true,
        mark_messages_deleted: true,
        hard_delete: true,
      });
      console.log('responce: ', responce);

    })
    res.send("done")




  }
  catch (err) {

    console.log(err);
  }
})

app.post("/deleteuser", async (req, res) => {
  try {
    let {userId}=req.body
    console.log(userId)
    const responce = await serverClient.deleteUser(userId, {
       delete_conversation_channels: true,
       mark_messages_deleted: true,
       hard_delete: true,
    });
     
    res.send("done")
  }
  catch (err) {

    console.log(err);
  }
})
const deleteChannel= async()=>{
  try {
    const filter = { type: 'messaging' };
    const sort = [{ last_message_at: -1 }];
    const { users } = await serverClient.queryUsers({ role: "user" });
    const channels = await serverClient.queryChannels(filter, sort);

    let notonlinePlayers = users.filter((ele) => {
      return ele.online
    })
    let notplayerid=[]
    notonlinePlayers.map((ele) => {
      notplayerid.push(ele.id)
    })


    console.log("notonlinePlayers:", notplayerid)

    const filtered = channels.filter((channelMember) => {
      let mem = Object.keys(channelMember.state.members)
      console.log("mem:", mem)
      return !mem.some((ele) => {
        return notplayerid.includes(ele)
      })
    })
    filtered.map((ele) => {
      console.log("filtered:", ele)
    })
   
    
      filtered.slice(0, 5).map(async (ele) => {
        cid = ele.data.cid
        const response = await serverClient.deleteChannels([cid], { hard_delete: true });
        console.log('response: ', response);
      })
  }
  catch (err) {

    console.log(err);
  }
}
app.get("/deletechannel", async (req, res) => {
  try {
    const filter = { type: 'messaging' };
    const sort = [{ last_message_at: -1 }];
    const { users } = await serverClient.queryUsers({ role: "user" });
    const channels = await serverClient.queryChannels(filter, sort);

    let notonlinePlayers = users.filter((ele) => {
      return ele.online
    })
    let notplayerid=[]
    notonlinePlayers.map((ele) => {
      notplayerid.push(ele.id)
    })


    console.log("notonlinePlayers:", notplayerid)

    const filtered = channels.filter((channelMember) => {
      let mem = Object.keys(channelMember.state.members)
      console.log("mem:", mem)
      return !mem.some((ele) => {
        return notplayerid.includes(ele)
      })
    })
    filtered.map((ele) => {
      console.log("filtered:", ele)
    })
   
    
      filtered.slice(0, 5).map(async (ele) => {
        cid = ele.data.cid
        const response = await serverClient.deleteChannels([cid], { hard_delete: true });
        console.log('response: ', response);
      })
    res.send({len:filtered.length})
  }
  catch (err) {

    console.log(err);
  }

})


app.get("/", async (req, res) => {
  try {

    console.log("hit");
    res.send(api_key)
  } catch (err) {
    console.log("err");
    res.send(err)
  }
})
app.post("/create", async (req, res) => {
  const userId = v4()
  console.log('userId: ', userId);
  const token = serverClient.createToken(userId)
  // res.json({api_key,userId,token})
  // const { users } = await serverClient.queryUsers({ name: "ddd" });
  res.json({
    "api_key": "r6yq8umwd7xe",
    userId,
    token
  })
})

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = v4();
    console.log('userId: ', userId);
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    console.log('error: ', error);
    res.json(error);
  }
});
app.get("/onlineplayers", async (req, res) => {
  // try{
  //     const  {users}  = await serverClient.queryUsers({});
  //     // console.log('users: ', users);
  //     const list=users.map((ele)=>{
  //         return ele.name
  //     })
  //     res.send(users)

  // }catch(err){
  //     res.send(err)
  // }
  const { users } = await serverClient.queryUsers({});
  let onlinePlayers = users.filter((ele) => {
    return ele.online
  })
  console.log('onlinePlayers: ', onlinePlayers);
  res.send(onlinePlayers)


})
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    const token = serverClient.createToken(users[0].id);
    console.log('token: ', token);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});



















app.post('/join', async (req, res) => {
  try {
    const userId = v4();
    console.log('userId: ', userId);
    const token = serverClient.createToken(userId);
    // console.log('token: ', token);
    // res.json({ token, userId });
    res.json({
      token,userId,
      api_key
    });
  } catch (error) {
    console.log('error: ', error);
    res.json(error);
  }
})
app.listen(5001, () => {
  console.log("Server is running on port 3001");
});
