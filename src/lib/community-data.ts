
import { Music, Dribbble, Drama } from 'lucide-react';

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
  { name: 'Alice', image: 'https://placehold.co/100x100.png', hint: 'woman smiling' },
  { name: 'Bob', image: 'https://placehold.co/100x100.png', hint: 'man glasses' },
  { name: 'Charlie', image: 'https://placehold.co/100x100.png', hint: 'person nature' },
  { name: 'Diana', image: 'https://placehold.co/100x100.png', hint: 'woman portrait' },
  { name: 'Ethan', image: 'https://placehold.co/100x100.png', hint: 'man hiking' },
];

export const feedPosts = [
  {
    author: 'Diana',
    avatarHint: 'woman portrait',
    content: "Just got my tickets for the Cape Town International Jazz Festival! Who else is going? Can't wait!",
    likes: 42,
    comments: 18,
    verified: false,
  },
  {
    author: 'Fiona',
    avatarHint: 'woman city',
    content: "Rocking the Daisies was absolutely epic last weekend! Here's a shot from the main stage. The energy was unreal.",
    image: 'https://placehold.co/600x400.png',
    imageHint: 'music festival crowd',
    likes: 128,
    comments: 34,
    verified: false,
  },
  {
    author: 'Bob',
    avatarHint: 'man glasses',
    content: 'Checked in at FNB Stadium! Any tips for first-timers at the Soweto Derby? Want to make the most of the experience!',
    likes: 15,
    comments: 9,
    verified: true,
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

export const savedEvents = [
    { id: '1', name: 'Cape Town International Jazz Festival', date: 'Oct 26, 2025', image: 'https://placehold.co/600x400.png', imageHint: 'jazz music festival' },
    { id: '2', name: 'Soweto Derby', date: 'Nov 09, 2025', image: 'https://placehold.co/600x400.png', imageHint: 'soccer stadium' },
];

export const userReviews = [
    { eventName: 'Rocking the Daisies', rating: 5, comment: 'Absolutely incredible experience! The energy was insane and the lineup was top-notch. Can\'t wait for next year!' },
    { eventName: 'Gugs Unplugged Sessions', rating: 4, comment: 'A wonderful, intimate show. It felt so authentic and the talent was amazing. A must-do for local music lovers.' },
];

export const joinedCommunities = [
    { name: 'Music Lovers', slug: 'music-lovers', members: '1.2k', Icon: Music },
    { name: 'Sports Fans', slug: 'sports-fans', members: '856', Icon: Dribbble },
];

export const followingMembers = [
  { name: 'Alice', image: 'https://placehold.co/100x100.png', hint: 'woman smiling' },
  { name: 'Bob', image: 'https://placehold.co/100x100.png', hint: 'man glasses' },
  { name: 'Diana', image: 'https://placehold.co/100x100.png', hint: 'woman portrait' },
];
