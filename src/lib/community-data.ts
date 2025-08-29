
import { Music, Dribbble, Drama } from 'lucide-react';

export interface FollowingMember {
    name: string;
    image: string;
    hint: string;
}

export const communityDetails = {
    'music-lovers': {
        name: 'Music Lovers',
        description: 'A place for fans of all genres to connect and share their passion for music.'
    },
    'sports-fans': {
        name: 'Sports Fans',
        description: 'Discussing everything from local matches to international tournaments.'
    },
    'theatre-buffs': {
        name: 'Theatre Buffs',
        description: 'For lovers of the stage, from Broadway hits to local productions.'
    }
}

export const communityMembers = [
  { name: 'Alice', image: 'https://st5.depositphotos.com/57718742/67162/i/450/depositphotos_671626028-stock-photo-shy-young-latino-woman-venezuelan.jpg', hint: 'woman smiling' },
  { name: 'Bob', image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/8fd4faba-7e27-423c-a574-419c55b516cb-profile_image-300x300.png', hint: 'man glasses' },
  { name: 'Charlie', image: 'https://m.media-amazon.com/images/I/41e5cmC2mFL._UF1000,1000_QL80_.jpg', hint: 'person nature' },
  { name: 'Diana', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT21X7zrkKjUnD7SXghEhYrivYrvJYoobmILw&s', hint: 'woman portrait' },
  { name: 'Ethan', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-d_zc-iONnLXOqvaLbY1ofqpXMmwc37JCzw&s', hint: 'man hiking' },
];

export const feedPosts = [
  {
    author: 'Diana',
    avatarHint: 'woman portrait',
    content: "Just got my tickets for the Cape Town International Jazz Festival! Who else is going? Can't wait!",
    likes: 42,
    comments: 18,
    verified: false,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT21X7zrkKjUnD7SXghEhYrivYrvJYoobmILw&s',
  },
  {
    author: 'Fiona',
    avatarHint: 'woman city',
    content: "Rocking the Daisies was absolutely epic last weekend! Here's a shot from the main stage. The energy was unreal.",
    image: 'https://hypemagazine.co.za/wp-content/uploads/2025/03/tems-2-1024x682.webp',
    imageHint: 'music festival crowd',
    likes: 128,
    comments: 34,
    verified: false,
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Fiona2009MarchaDF.JPG/1200px-Fiona2009MarchaDF.JPG'
  },
  {
    author: 'Bob',
    avatarHint: 'man glasses',
    content: 'Checked in at FNB Stadium! Any tips for first-timers at the Soweto Derby? Want to make the most of the experience!',
    likes: 15,
    comments: 9,
    verified: true,
    avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/8fd4faba-7e27-423c-a574-419c55b516cb-profile_image-300x300.png',
  }
];

export const eventDiscussions = [
  { title: "Who's going to the Cape Town Jazz Festival?", event: 'Cape Town International Jazz Festival', replies: 78 },
  { title: 'Best pre-game spot near FNB Stadium?', event: 'Soweto Derby', replies: 45 },
  { title: 'The Lion King Meetup - Act 1 Intermission', event: 'The Lion King', replies: 22 },
];

export const communityGroups = [
    { name: 'Music Lovers', slug: 'music-lovers', members: '1.2k', Icon: Music },
    { name: 'Sports Fans', slug: 'sports-fans', members: '856', Icon: Dribbble },
    { name: 'Theatre Buffs', slug: 'theatre-buffs', members: '432', Icon: Drama },
]

export const userReviews = [
    { eventName: 'Rocking the Daisies', rating: 5, comment: 'Absolutely incredible experience! The energy was insane and the lineup was top-notch. Can\'t wait for next year!' },
    { eventName: 'Gugs Unplugged Sessions', rating: 4, comment: 'A wonderful, intimate show. It felt so authentic and the talent was amazing. A must-do for local music lovers.' },
];

export const joinedCommunities = [
    { name: 'Music Lovers', slug: 'music-lovers', members: '1.2k', Icon: Music },
    { name: 'Sports Fans', slug: 'sports-fans', members: '856', Icon: Dribbble },
];

export const followingMembers: FollowingMember[] = [
  { name: 'Alice', image: 'https://st5.depositphotos.com/57718742/67162/i/450/depositphotos_671626028-stock-photo-shy-young-latino-woman-venezuelan.jpg', hint: 'woman smiling' },
  { name: 'Bob', image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/8fd4faba-7e27-423c-a574-419c55b516cb-profile_image-300x300.png', hint: 'man glasses' },
  { name: 'Diana', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT21X7zrkKjUnD7SXghEhYrivYrvJYoobmILw&s', hint: 'woman portrait' },
];

    
