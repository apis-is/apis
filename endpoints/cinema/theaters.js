
// https://kvikmyndir.is/bio/sambioin/
// https://kvikmyndir.is/bio/bio-paradis/
// https://kvikmyndir.is/bio/smarabio/
// https://kvikmyndir.is/bio/haskolabio/
// https://kvikmyndir.is/bio/laugarasbio/
// https://kvikmyndir.is/bio/borgarbio/

// TODO: Add Bíóhúsið and also scrape the showtimes: https://biohusid.is

const theaters = [
  {
    name: 'Sambíóin Álfabakka',
    location: 'Álfabakka 8, 109 Reykjavík',
    phone: '575 8900',
    email: 'alfabakki@samfilm.is',
    website: 'https://www.sambio.is',
    auditoriums: 6,
    totalSeats: 948,
    coordinates: ['64.1080159', '-21.8447893']
  },
  {
    name: 'Sambíóin Egilshöll',
    location: 'Fossaleyni 1, 112 Reykjavík',
    phone: '575 8900',
    email: 'egilsholl@samfilm.is',
    website: 'https://www.sambio.is',
    auditoriums: 4,
    totalSeats: 841,
    coordinates: ['64.1465566', '-21.7720698']
  },
  {
    name: 'Sambíóin Kringlunni',
    location: 'Kringlunni 4-12, 103 Reykjavík',
    phone: '575 8900',
    email: 'kringlan@samfilm.is',
    website: 'https://www.sambio.is',
    auditoriums: 3,
    totalSeats: 685,
    coordinates: ['64.129798', '-21.8961461']
  },
  {
    name: 'Sambíóin Akureyri',
    location: 'Ráðhústorgi 8, 600 Akureyri',
    phone: '575 8900',
    email: 'midasala.ak@samfilm.is',
    website: 'https://www.sambio.is',
    auditoriums: 2,
    totalSeats: 282,
    coordinates: ['65.6828565', '-18.0903055']
  },
  {
    name: 'Sambíóin Keflavík',
    location: 'Hafnargötu 33, 230 Reykjanesbæ',
    phone: '575 8900',
    email: 'keflavik@samfilm.is',
    website: 'https://www.sambio.is',
    auditoriums: 2,
    totalSeats: 271,
    coordinates: ['64.0027957', '-22.5533753']
  },
  {
    name: 'Bíó Paradís',
    location: 'Hverfisgötu 54, 101 Reykjavík',
    phone: '412 7711',
    email: 'midasala@bioparadis.is',
    website: 'https://bioparadis.is',
    auditoriums: null,
    totalSeats: null,
    coordinates: ['64.1456367', '-21.9260192']
  },
  {
    name: 'Smárabíó',
    location: 'Hagasmára 1, 201 Kópavogi',
    phone: '564 0000',
    email: 'smarabio@smarabio.is',
    website: 'https://www.smarabio.is/',
    auditoriums: 5,
    totalSeats: 1043, // 398 + 251 + 66 + 193 + 135
    coordinates: ['64.10105378', '-21.88326709']
  },
  {
    name: 'Háskólabíó',
    location: 'Hagatorgi, 107 Reykjavík',
    phone: '591 5145',
    email: 'haskolabio@smarabio.is',
    website: 'https://www.smarabio.is',
    auditoriums: 7,
    totalSeats: 1891,
    coordinates: ['64.1405721', '-21.9544179']
  },
  {
    name: 'Laugarásbíó',
    location: 'Laugarási, 104 Reykjavík',
    phone: '553 2075',
    email: 'laugarasbio@laugarasbio.is',
    website: 'http://laugarasbio.is',
    auditoriums: null,
    totalSeats: null,
    coordinates: ['64.1481637', '-21.867021']
  },
  {
    name: 'Borgarbíó',
    location: 'Hólabraut 12, 600 Akureyri',
    phone: '462 2602',
    email: 'borgarbio@borgarbio.is',
    website: 'https://www.facebook.com/borgarbio.akureyri',
    auditoriums: 2,
    totalSeats: 300,
    coordinates: ['65.6840091', '-18.0921921']
  }
]

module.exports = theaters
