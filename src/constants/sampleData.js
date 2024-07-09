
export const sampleChats=[{
  avatar:["https://www.w3schools.com/howto/img_avatar.png"],
  name:'John Doe',
  _id:'1',
  groupChat: false,
  members: ['1','2','3'],
},
{
avatar:["https://www.w3schools.com/howto/img_avatar.png"],
name:'Jane Doe',
_id:'2',
groupChat: false,
members: ['1','2'],
},
]

export const sampleUsers=[{
  avatar:["https://www.w3schools.com/howto/img_avatar.png"],
  name:'John Doe',
  _id:'1',
},
{
avatar:["https://www.w3schools.com/howto/img_avatar.png"],
name:'Jane Doe',
_id:'2',
}]

export const sampleNotifications=[{
  sender:{avatar:["https://www.w3schools.com/howto/img_avatar.png"]},
  name:'John Doe',
  _id:'1',
},
{
sender:{avatar:["https://www.w3schools.com/howto/img_avatar.png"]},
name:'Jane Doe',
_id:'2',
}]

export const sampleMessage=[
  {
    attachments:[],
    content: 'Land lele bhosdike',
    _id: 'edjjreomrlkmior',
    sender:{
      _id: 'user._id',
      name: 'Chaman'
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z"
  },
  {
    attachments:[
      {
        public_id: 'asdsad',
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: 'Land lele bhosdike',
    _id: 'edjjreomrlkmiord',
    sender:{
      _id: 'ndnce',
      name: 'Chaman'
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z"
  }
]

export const dashboardData={
  users: [
    {
      name: 'John Doe',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      _id:'1',
      username: 'john_doe',
      friends: 20,
      groups: 5
    },
    {
      name: 'Jane Doe',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      _id:'2',
      username: 'jane_doe',
      friends: 20,
      groups: 5
    }
  ],
  chats: [
    {
      name: 'LauraLele Group',
      avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
      _id: '1',
      groupChat: false,
      members: [
        {_id:'1',avatar:'https://www.w3schools.com/howto/img_avatar.png'},
        {_id:'2',avatar:'https://www.w3schools.com/howto/img_avatar.png'}
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator:{
        name: 'John Doe',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png'
      }
    },
    {
      name: 'Unoff Group',
      avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
      _id: '2',
      groupChat: true,
      members: [
        {_id:'1',avatar:'https://www.w3schools.com/howto/img_avatar.png'},
        {_id:'2',avatar:'https://www.w3schools.com/howto/img_avatar.png'}
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator:{
        name: 'Jane Doe',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png'
      }
    }
  ],
  messages: [
    {
      attachments:[],
      content: 'Land lele bhosdike',
      _id: 'edjjreomrlkmior',
      sender:{
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: 'Chaman'
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-02-12T10:41:30.630Z"
    },
    {
      attachments:[
        {
          public_id: 'asdsad',
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: 'Lund lele bhosdike',
      _id: 'edjjreomrlkmiord',
      sender:{
       avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: 'Chaman'
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-02-12T10:41:30.630Z"
    }
  ],

}

export const   sampleCommunity=[{
  avatar:["https://www.w3schools.com/howto/img_avatar.png"],
  name:'John Doe',
  _id:'1',
  groupChat: true,
  creator: {
    _id: 'ddld',
    isAdmin: true
  },
},
{
avatar:["https://www.w3schools.com/howto/img_avatar.png"],
name:'Jane Doe',
_id:'2',
groupChat: false,
creator: {
  _id: 'ddldj',
  isAdmin: true
},
},
]