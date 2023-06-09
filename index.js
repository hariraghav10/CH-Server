import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, push, update, get } from "firebase/database";
import sha1 from 'sha1'
import * as dotenv from "dotenv";
dotenv.config()
const app = express()
app.use(express.json()) 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000
app.use(cors());



const firebaseConfig = {
    apiKey:process.env.apiKey,
    authDomain:process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
  };

const ap = initializeApp(firebaseConfig);

  let qr_proxy={
  "100":"0",
  "101":"1",
  "102":"2",
  "103":"3",
  "104":"4",
  "105":"5",
  "106":"6",
  "107":"7",
  "108":"8",
}

let qr_proxy2=
["start",

//Friendly  
"56d0d178-7059-464c-89ef-18589c78e974",
"0ebe74df-dbab-421a-aae0-068ae01d6131",
"966389f2-eeec-46d9-90de-648fc9eb99b5",
"7a419c46-3e61-4a60-8964-1d8300b9a642",
"aa091028-536a-4f5a-881f-7b08af85e81c",
"54423cac-bc71-4fb0-90c0-827be91d4e53",
"12c7d001-b60f-49b9-9b3d-e4afd33a0d46",
"c2253eb3-76b0-4d80-afdc-4fb9c990e549",
"14541cc1-7fdf-4ddd-aee4-d83b2d6369ce",
"222c78ea-e7ea-4728-bb92-b67f6a35f1f3",
"153d4e2c-5c75-4d28-8cef-d9e0b78d3432",
"ba5ff18a-618b-4676-a5e8-d376521b010c",
"373aa7e3-44fc-48fd-9a74-9847e4ca1a87",
"32b2ed72-f2c9-4d81-990b-1820701c6663",
"81f11b39-ab39-40f8-8def-93b2f5aa40ea",

//Golden
"4e2d0c4c-7c52-4848-ae5c-4af4d2fdfecd",
"8e7c7154-7da2-447a-b40f-4a1e86b7a9ca",
"a50ed7b8-41f7-4a7a-8d81-0e8d848508ff",
"2f541570-35b2-4786-84a3-17250c543bf7",
"e2e63546-bb28-42a2-86f2-5177371b6229",
"8c914c5b-7b7c-46d7-8de8-0c44fa5c385c",
"01e1d3c2-bfd9-4a53-806a-0ac8341d1fb4",
"91f0abf0-1004-4401-ab02-550ba6a680a2",
"82e918ce-1265-4c59-8891-ef494965dab0",
"0e296406-2c45-46e4-abf0-c4c6e2275a4b",

//Joker
"c6c5d813-ea70-4711-b122-939ab2e0a0ad",
"d603bdd0-0892-47c7-8e65-e7979f0bf985",
"bfd0a70b-17b3-40e1-942a-78e0631cdb94",
"a8301d00-9bb2-4251-afd0-f6cf39f29aa1",
"1762bdda-4e0b-4736-a9f9-13cae5cf1f70",
"0e8aa083-9b9d-4a59-ac92-4e45aa9b5d4a",
"b6723470-2088-4b8b-b4d5-c4ec100ed35f",
"1c3affd4-1475-48ab-80f6-39dd77676a4b",
"d8d31f13-964d-4e4d-addc-1043bf9d9907",
"4719c1d8-7b0c-4908-9c1c-c43204a086d3",
"98d2e11f-3cd3-40f0-aab4-692859618cf6",
"86365b03-7e59-4ef9-acb7-473a41826edd",
"6577ed6d-c511-49b5-b201-c6ada977a946",
"833cfb04-002d-42f5-bbc3-46c6d5def290",
"8807154a-39bc-4818-a8b1-3d29ac40f089",
"87c3da47-a5ca-4e4a-8d02-b27fcf7ee686",
"ce69c39e-7b8f-4f86-821b-c10fc8f39f71",
"ee11b52a-fad0-4416-853b-1ec53e5d273b",
"5a855026-9bc0-4e1e-b60a-1534b7c4cbd1",
"32261c7b-9ad0-48b6-a7e0-7b841f748978",

//Danger
"085b9966-4c71-4c01-94d4-92d28bcacb61",
"2b56249d-7c15-4da4-a7c5-409b41e54f43",
"721b57ba-4264-40f4-80ec-7dfebad91ed4",
"8e6c73d7-6c09-41bb-b471-1bbdb872d568",
"3bb0c0fd-f8b4-4ffa-9199-b3d7b8a488b6",
"622bc052-155c-4539-b994-0abd9ebd6b60",
"bf4fe2fb-a4b8-4193-9c9c-a1d8db23c217",
"d0204e03-f8b6-4cb2-a91f-65016ee4307c",
"a81d3b12-01c5-4be9-bc1f-a42413e3069e",
"7667e35c-3dc2-415f-9651-27ee5d213d16",


//empty starts
//Jackpot
"5e6658ee-5b4b-4b5e-94da-bcddc9e88d3d",
"8a2094d9-6ea7-4d7b-ad7c-02baed739ab6",
"90e494ca-b2ec-4ca9-9957-59cfcdb6a6fa",
"eaca3681-1154-4512-8c95-da8cf1a14ac5",
"75b1c108-3e67-499d-8373-fb1c3c03fed8",
"3d0b1e50-fbdb-4ecb-b7e0-8a8414a71f98",
"d688120f-0685-4470-b8b2-7df14b71efe6",
"31030eac-bce2-4c30-8c8a-bed36c6c916a",
"813dab33-1b35-4855-9855-e73942188528",
"a9ac0885-5fb4-4ee7-a2ee-bfaf4bcf852e",
"fc772c0a-ea38-46b3-881d-352e0cda87c6",
"c5ce6599-79a0-447f-b943-7171f7118bf5",
"e06a77cf-7b4c-48bb-bce0-f17fa34ff66a",
"d244ffce-4412-45c4-9c1c-ec9f91fc7b38",
"25cd8127-5bc9-4f77-86b6-1eac78dcb173",
"42693654-8004-4db5-beb6-27728fee267f",
"b901cf09-0bd1-47a9-8904-a6f7e1895f66",
"f4132f93-0baf-417b-ad25-89cfedcfbc52",
"0c5293bc-959e-4bd1-93fa-1696a6fdd441",
"39815a83-e093-44a7-81f9-3c522accd59e",

//Empty
"dcc1e596-38c4-42f7-93f5-a1fc3a44e32a",
"2d4d9508-7725-4910-90ef-01e22bf31bf5",
"3024ed51-6254-4f55-a362-b1692ed07fc2",
"282704eb-d4f2-4ebf-bccf-1028b44eed12",
"ef8935e8-d9cc-443e-ab2b-eae8787ecf31",
"59733c3f-7f92-4645-99ae-0b63aea81ddc",
"d32a14d7-cda8-4b11-aced-76b93bb4c466",
"ad8e8d52-a69c-4327-aa83-85f8503186eb",
"81186c0c-4133-4bcf-8e29-1115c1d016f9",
"29b31fc3-4315-45d1-b653-32a0aa7fac92",
"db052097-1570-4523-bdd5-12223ff2d714",
"fd57805a-4d00-4082-bac4-51d6da4b164c",
"70eb259e-efb3-4b83-820f-2890c2283c48",
"0b8fa7d8-c91d-4715-a62d-20fb76b5a6b6",
"b16337a9-68df-4b50-890d-6ab1b1f27646",

//Funny
"edc0422e-8223-4284-9d63-60c2d9202bb5",
"5aaf6249-1859-418a-9424-bb3776d3dd99",
"585dbbab-408c-4bc5-926a-2801dc7f36f1",
"a0a3d448-2e4a-40b0-903e-de1ea78300ba",
"5de86ee4-8ce8-4cea-b369-9e53c937071b",
"d1c1bf99-ab0c-48b0-a263-65ddf85abb19",
"485c83cf-e984-499e-b3db-294b3bb56084",
"1e668125-ae9a-48d7-99ef-ee3d17563f69",
"3eb47b4d-fec0-44f7-9b08-18cfefab4c98",
"1deabeae-6322-42e3-82ae-409da2aa0add",
"7b1474ce-c959-457a-96a4-3ef85de4d0ef",
"e35977bc-4274-407b-9e63-90bb49049635",
"bb9780a3-a8e5-4e78-9cb6-be9e84d4b311",
"b7d969f7-d47f-47a9-8acb-4074821cd526",
"fde6faf2-e274-470b-baf3-3dd6319bcb51",
"4f6e4b01-51d8-4994-a67f-312a756bb348",
"4162a5da-9252-4889-a15c-5053f64fbacb",
"c028f491-e30b-4ea3-9ca8-2a4cd0acf575",
"431ee538-7cf3-47b7-8ab6-8675b49f9fad",
"501c82b1-dc31-4ecc-a897-e6ec2e7c40d9",
"60907dc7-8c9f-47b4-9cb9-a645e26406b7",
"20cb908c-76e6-40ce-adc8-9ae19ef14fd6",
"b8db2dae-4675-4bde-b756-076cbdf6a210",
"43387e42-b13b-4b1e-bddc-53546881a47f",
"14e6d78f-6d01-43c0-a8f7-a7a15019a62d",

//Hints
"12519e65-ee28-4348-b91e-5fa3ad23f639",
"4ec75a2f-2572-4c8b-a731-eab87110daa2",
"a2e7b055-df97-49f4-a807-4a827b952cfe",
"46f5cb04-8d9d-4ec7-8f1e-8eca73252fbe",
"e208f734-18d2-4aea-87a9-5a1dd7881c72",
"f83cd2b8-efee-4bad-b269-ff0f1c8acaec",
"93be48b8-a57a-4f16-8def-8d0796ded049",
"70d6bac1-1d07-47f4-a480-152a6310f8a8",
"d59c6cb3-9a56-4734-9777-44295edab17c",
"84d099f2-f583-4597-b510-b69fdaeecfc6",
"a10e1d1d-505f-409c-b8de-99b5b25fe14b",
"c90fe17b-edc5-4daa-8658-f6e054673c5e",
"77811e3b-cc0b-4de2-82ee-a1a5f81772a2",
"cab63508-01aa-4a0d-a681-40348d26dc0a",
"5556ae01-d2bb-4ad0-93e7-3c8781d59618"



]

/*
[ Friendly
  "https://ch-server.onrender.com/app?val=56d0d178-7059-464c-89ef-18589c78e974",
  "https://ch-server.onrender.com/app?val=0ebe74df-dbab-421a-aae0-068ae01d6131",
  "https://ch-server.onrender.com/app?val=966389f2-eeec-46d9-90de-648fc9eb99b5",
  "https://ch-server.onrender.com/app?val=7a419c46-3e61-4a60-8964-1d8300b9a642",
  "https://ch-server.onrender.com/app?val=aa091028-536a-4f5a-881f-7b08af85e81c",
  "https://ch-server.onrender.com/app?val=54423cac-bc71-4fb0-90c0-827be91d4e53",
  "https://ch-server.onrender.com/app?val=12c7d001-b60f-49b9-9b3d-e4afd33a0d46",
  "https://ch-server.onrender.com/app?val=c2253eb3-76b0-4d80-afdc-4fb9c990e549",
  "https://ch-server.onrender.com/app?val=14541cc1-7fdf-4ddd-aee4-d83b2d6369ce",
  "https://ch-server.onrender.com/app?val=222c78ea-e7ea-4728-bb92-b67f6a35f1f3",
  "https://ch-server.onrender.com/app?val=153d4e2c-5c75-4d28-8cef-d9e0b78d3432",
  "https://ch-server.onrender.com/app?val=ba5ff18a-618b-4676-a5e8-d376521b010c",
  "https://ch-server.onrender.com/app?val=373aa7e3-44fc-48fd-9a74-9847e4ca1a87",
  "https://ch-server.onrender.com/app?val=32b2ed72-f2c9-4d81-990b-1820701c6663",
  "https://ch-server.onrender.com/app?val=81f11b39-ab39-40f8-8def-93b2f5aa40ea",
  
  Golden
  "https://ch-server.onrender.com/app?val=4e2d0c4c-7c52-4848-ae5c-4af4d2fdfecd",
  "https://ch-server.onrender.com/app?val=8e7c7154-7da2-447a-b40f-4a1e86b7a9ca",
  "https://ch-server.onrender.com/app?val=a50ed7b8-41f7-4a7a-8d81-0e8d848508ff",
  "https://ch-server.onrender.com/app?val=2f541570-35b2-4786-84a3-17250c543bf7",
  "https://ch-server.onrender.com/app?val=e2e63546-bb28-42a2-86f2-5177371b6229",
  "https://ch-server.onrender.com/app?val=8c914c5b-7b7c-46d7-8de8-0c44fa5c385c",
  "https://ch-server.onrender.com/app?val=01e1d3c2-bfd9-4a53-806a-0ac8341d1fb4",
  "https://ch-server.onrender.com/app?val=91f0abf0-1004-4401-ab02-550ba6a680a2",
  "https://ch-server.onrender.com/app?val=82e918ce-1265-4c59-8891-ef494965dab0",
  "https://ch-server.onrender.com/app?val=0e296406-2c45-46e4-abf0-c4c6e2275a4b",
  
  Joker
  "https://ch-server.onrender.com/app?val=c6c5d813-ea70-4711-b122-939ab2e0a0ad",
  "https://ch-server.onrender.com/app?val=d603bdd0-0892-47c7-8e65-e7979f0bf985",
  "https://ch-server.onrender.com/app?val=bfd0a70b-17b3-40e1-942a-78e0631cdb94",
  "https://ch-server.onrender.com/app?val=a8301d00-9bb2-4251-afd0-f6cf39f29aa1",
  "https://ch-server.onrender.com/app?val=1762bdda-4e0b-4736-a9f9-13cae5cf1f70",
  "https://ch-server.onrender.com/app?val=0e8aa083-9b9d-4a59-ac92-4e45aa9b5d4a",
  "https://ch-server.onrender.com/app?val=b6723470-2088-4b8b-b4d5-c4ec100ed35f",
  "https://ch-server.onrender.com/app?val=1c3affd4-1475-48ab-80f6-39dd77676a4b",
  "https://ch-server.onrender.com/app?val=d8d31f13-964d-4e4d-addc-1043bf9d9907",
  "https://ch-server.onrender.com/app?val=4719c1d8-7b0c-4908-9c1c-c43204a086d3",
  "https://ch-server.onrender.com/app?val=98d2e11f-3cd3-40f0-aab4-692859618cf6",
  "https://ch-server.onrender.com/app?val=86365b03-7e59-4ef9-acb7-473a41826edd",
  "https://ch-server.onrender.com/app?val=6577ed6d-c511-49b5-b201-c6ada977a946",
  "https://ch-server.onrender.com/app?val=833cfb04-002d-42f5-bbc3-46c6d5def290",
  "https://ch-server.onrender.com/app?val=8807154a-39bc-4818-a8b1-3d29ac40f089",
  "https://ch-server.onrender.com/app?val=87c3da47-a5ca-4e4a-8d02-b27fcf7ee686",
  "https://ch-server.onrender.com/app?val=ce69c39e-7b8f-4f86-821b-c10fc8f39f71",
  "https://ch-server.onrender.com/app?val=ee11b52a-fad0-4416-853b-1ec53e5d273b",
  "https://ch-server.onrender.com/app?val=5a855026-9bc0-4e1e-b60a-1534b7c4cbd1",
  "https://ch-server.onrender.com/app?val=32261c7b-9ad0-48b6-a7e0-7b841f748978",
  
  Danger
  "https://ch-server.onrender.com/app?val=085b9966-4c71-4c01-94d4-92d28bcacb61",
  "https://ch-server.onrender.com/app?val=2b56249d-7c15-4da4-a7c5-409b41e54f43",
  "https://ch-server.onrender.com/app?val=721b57ba-4264-40f4-80ec-7dfebad91ed4",
  "https://ch-server.onrender.com/app?val=8e6c73d7-6c09-41bb-b471-1bbdb872d568",
  "https://ch-server.onrender.com/app?val=3bb0c0fd-f8b4-4ffa-9199-b3d7b8a488b6",
  "https://ch-server.onrender.com/app?val=622bc052-155c-4539-b994-0abd9ebd6b60",
  "https://ch-server.onrender.com/app?val=bf4fe2fb-a4b8-4193-9c9c-a1d8db23c217",
  "https://ch-server.onrender.com/app?val=d0204e03-f8b6-4cb2-a91f-65016ee4307c",
  "https://ch-server.onrender.com/app?val=a81d3b12-01c5-4be9-bc1f-a42413e3069e",
  "https://ch-server.onrender.com/app?val=7667e35c-3dc2-415f-9651-27ee5d213d16",
  
  Empty
  "https://ch-server.onrender.com/app?val=dcc1e596-38c4-42f7-93f5-a1fc3a44e32a",
  "https://ch-server.onrender.com/app?val=2d4d9508-7725-4910-90ef-01e22bf31bf5",
  "https://ch-server.onrender.com/app?val=3024ed51-6254-4f55-a362-b1692ed07fc2",
  "https://ch-server.onrender.com/app?val=282704eb-d4f2-4ebf-bccf-1028b44eed12",
  "https://ch-server.onrender.com/app?val=ef8935e8-d9cc-443e-ab2b-eae8787ecf31",
  "https://ch-server.onrender.com/app?val=59733c3f-7f92-4645-99ae-0b63aea81ddc",
  "https://ch-server.onrender.com/app?val=d32a14d7-cda8-4b11-aced-76b93bb4c466",
  "https://ch-server.onrender.com/app?val=ad8e8d52-a69c-4327-aa83-85f8503186eb",
  "https://ch-server.onrender.com/app?val=81186c0c-4133-4bcf-8e29-1115c1d016f9",
  "https://ch-server.onrender.com/app?val=29b31fc3-4315-45d1-b653-32a0aa7fac92",
  "https://ch-server.onrender.com/app?val=db052097-1570-4523-bdd5-12223ff2d714",
  "https://ch-server.onrender.com/app?val=fd57805a-4d00-4082-bac4-51d6da4b164c",
  "https://ch-server.onrender.com/app?val=70eb259e-efb3-4b83-820f-2890c2283c48",
  "https://ch-server.onrender.com/app?val=0b8fa7d8-c91d-4715-a62d-20fb76b5a6b6",
  "https://ch-server.onrender.com/app?val=b16337a9-68df-4b50-890d-6ab1b1f27646",
  
  Funny
  "https://ch-server.onrender.com/app?val=edc0422e-8223-4284-9d63-60c2d9202bb5",
  "https://ch-server.onrender.com/app?val=5aaf6249-1859-418a-9424-bb3776d3dd99",
  "https://ch-server.onrender.com/app?val=585dbbab-408c-4bc5-926a-2801dc7f36f1",
  "https://ch-server.onrender.com/app?val=a0a3d448-2e4a-40b0-903e-de1ea78300ba",
  "https://ch-server.onrender.com/app?val=5de86ee4-8ce8-4cea-b369-9e53c937071b",
  "https://ch-server.onrender.com/app?val=d1c1bf99-ab0c-48b0-a263-65ddf85abb19",
  "https://ch-server.onrender.com/app?val=485c83cf-e984-499e-b3db-294b3bb56084",
  "https://ch-server.onrender.com/app?val=1e668125-ae9a-48d7-99ef-ee3d17563f69",
  "https://ch-server.onrender.com/app?val=3eb47b4d-fec0-44f7-9b08-18cfefab4c98",
  "https://ch-server.onrender.com/app?val=1deabeae-6322-42e3-82ae-409da2aa0add",
  "https://ch-server.onrender.com/app?val=7b1474ce-c959-457a-96a4-3ef85de4d0ef",
  "https://ch-server.onrender.com/app?val=e35977bc-4274-407b-9e63-90bb49049635",
  "https://ch-server.onrender.com/app?val=bb9780a3-a8e5-4e78-9cb6-be9e84d4b311",
  "https://ch-server.onrender.com/app?val=b7d969f7-d47f-47a9-8acb-4074821cd526",
  "https://ch-server.onrender.com/app?val=fde6faf2-e274-470b-baf3-3dd6319bcb51",
  "https://ch-server.onrender.com/app?val=4f6e4b01-51d8-4994-a67f-312a756bb348",
  "https://ch-server.onrender.com/app?val=4162a5da-9252-4889-a15c-5053f64fbacb",
  "https://ch-server.onrender.com/app?val=c028f491-e30b-4ea3-9ca8-2a4cd0acf575",
  "https://ch-server.onrender.com/app?val=431ee538-7cf3-47b7-8ab6-8675b49f9fad",
  "https://ch-server.onrender.com/app?val=501c82b1-dc31-4ecc-a897-e6ec2e7c40d9",
  "https://ch-server.onrender.com/app?val=60907dc7-8c9f-47b4-9cb9-a645e26406b7",
  "https://ch-server.onrender.com/app?val=20cb908c-76e6-40ce-adc8-9ae19ef14fd6",
  "https://ch-server.onrender.com/app?val=b8db2dae-4675-4bde-b756-076cbdf6a210",
  "https://ch-server.onrender.com/app?val=43387e42-b13b-4b1e-bddc-53546881a47f",
  "https://ch-server.onrender.com/app?val=14e6d78f-6d01-43c0-a8f7-a7a15019a62d",
  
  Hints
  "https://ch-server.onrender.com/app?val=12519e65-ee28-4348-b91e-5fa3ad23f639",
  "https://ch-server.onrender.com/app?val=4ec75a2f-2572-4c8b-a731-eab87110daa2",
  "https://ch-server.onrender.com/app?val=a2e7b055-df97-49f4-a807-4a827b952cfe",
  "https://ch-server.onrender.com/app?val=46f5cb04-8d9d-4ec7-8f1e-8eca73252fbe",
  "https://ch-server.onrender.com/app?val=e208f734-18d2-4aea-87a9-5a1dd7881c72",
  "https://ch-server.onrender.com/app?val=f83cd2b8-efee-4bad-b269-ff0f1c8acaec",
  "https://ch-server.onrender.com/app?val=93be48b8-a57a-4f16-8def-8d0796ded049",
  "https://ch-server.onrender.com/app?val=70d6bac1-1d07-47f4-a480-152a6310f8a8",
  "https://ch-server.onrender.com/app?val=d59c6cb3-9a56-4734-9777-44295edab17c",
  "https://ch-server.onrender.com/app?val=84d099f2-f583-4597-b510-b69fdaeecfc6",
  "https://ch-server.onrender.com/app?val=a10e1d1d-505f-409c-b8de-99b5b25fe14b",
  "https://ch-server.onrender.com/app?val=c90fe17b-edc5-4daa-8658-f6e054673c5e",
  "https://ch-server.onrender.com/app?val=77811e3b-cc0b-4de2-82ee-a1a5f81772a2",
  "https://ch-server.onrender.com/app?val=cab63508-01aa-4a0d-a681-40348d26dc0a",
  "https://ch-server.onrender.com/app?val=5556ae01-d2bb-4ad0-93e7-3c8781d59618",
  
  Jackpots
  "https://ch-server.onrender.com/app?val=5e6658ee-5b4b-4b5e-94da-bcddc9e88d3d",
  "https://ch-server.onrender.com/app?val=8a2094d9-6ea7-4d7b-ad7c-02baed739ab6",
  "https://ch-server.onrender.com/app?val=90e494ca-b2ec-4ca9-9957-59cfcdb6a6fa",
  "https://ch-server.onrender.com/app?val=eaca3681-1154-4512-8c95-da8cf1a14ac5",
  "https://ch-server.onrender.com/app?val=75b1c108-3e67-499d-8373-fb1c3c03fed8",
  "https://ch-server.onrender.com/app?val=3d0b1e50-fbdb-4ecb-b7e0-8a8414a71f98",
  "https://ch-server.onrender.com/app?val=d688120f-0685-4470-b8b2-7df14b71efe6",
  "https://ch-server.onrender.com/app?val=31030eac-bce2-4c30-8c8a-bed36c6c916a",
  "https://ch-server.onrender.com/app?val=813dab33-1b35-4855-9855-e73942188528",
  "https://ch-server.onrender.com/app?val=a9ac0885-5fb4-4ee7-a2ee-bfaf4bcf852e",
  "https://ch-server.onrender.com/app?val=fc772c0a-ea38-46b3-881d-352e0cda87c6",
  "https://ch-server.onrender.com/app?val=c5ce6599-79a0-447f-b943-7171f7118bf5",
  "https://ch-server.onrender.com/app?val=e06a77cf-7b4c-48bb-bce0-f17fa34ff66a",
  "https://ch-server.onrender.com/app?val=d244ffce-4412-45c4-9c1c-ec9f91fc7b38",
  "https://ch-server.onrender.com/app?val=25cd8127-5bc9-4f77-86b6-1eac78dcb173",
  "https://ch-server.onrender.com/app?val=42693654-8004-4db5-beb6-27728fee267f",
  "https://ch-server.onrender.com/app?val=b901cf09-0bd1-47a9-8904-a6f7e1895f66",
  "https://ch-server.onrender.com/app?val=f4132f93-0baf-417b-ad25-89cfedcfbc52",
  "https://ch-server.onrender.com/app?val=0c5293bc-959e-4bd1-93fa-1696a6fdd441",
  "https://ch-server.onrender.com/app?val=39815a83-e093-44a7-81f9-3c522accd59e"
  ]
  
*/



 
app.use(express.static(__dirname + '/public'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



  app.get('/app',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
  })
  app.get('/user',function(req,res){
    res.sendFile(path.join(__dirname+'/userdet.html'));
  })



  app.post('/api/adduser',async function(req,res){

    let user_num=req.body.user_num
    let user_roll=req.body.user_roll
    console.log(user_num)
    let user_id=await sha1(user_num)
    console.log(user_id)
    res.send({
        "user_num":user_num,
        "user_id":user_id
    })
    const db = getDatabase();
    const updates = {};
    updates[`User_DB/${user_id}`] = {"qs":[1000],"email":user_roll};
    update(ref(db), updates);

  })

// add db data -----
  app.get('/api/db1',async function(req,res){

    //let user_num=req.body.user_num
    //console.log(user_num)
    //let user_id=await sha1(user_num)
    //console.log(user_id)
    /*
    res.send({
        "user_num":user_num,
        "user_id":user_id
    })*/
    res.send('done')
    
    const db = getDatabase();
    const updates = {};
    updates[`qrr_DB/`] = [
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},

      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},

      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},

    ];
    update(ref(db), updates);

  })

// -----

  app.post('/api',async function(req,res){
    console.log('came')
    let User_ID=req.body.user_ID
    console.log(User_ID)
    let qr_id_proxy=req.body.QR_id_p
    let qr_id = qr_proxy2.indexOf(qr_id_proxy);
    console.log(qr_id)

    if (qr_id>=56 && qr_id<=70){
     // type.innerHTML="Empty Question"
      //points.innerHTML="5 pts"
      let Ques_Curr_Link="https://ik.imagekit.io/hrhrhr/CH/live/empty/empty2.png"
      let SendObj={
        "UserID":User_ID,
        "QR_ID":qr_id,
        "Q_Link":Ques_Curr_Link,
        "qr_status":"1",
        "question-status":"2"
      }

      res.send(SendObj)
    }
    else if (qr_id>=71 && qr_id<=95){
     // type.innerHTML="Funny Question"
      //points.innerHTML="5 pts"
      let Ques_Curr_Link="https://ik.imagekit.io/hrhrhr/CH/live/empty/no-questions2.jpg"
      let SendObj={
        "UserID":User_ID,
        "QR_ID":qr_id,
        "Q_Link":Ques_Curr_Link,
        "qr_status":"1" ,
        "question-status":"2"
      }

      res.send(SendObj)
    }
    else if (qr_id>=96 && qr_id<=110){
    //  type.innerHTML="Hint Question"
    //  points.innerHTML="5 pts"
      let Ques_Curr_Link="https://ik.imagekit.io/hrhrhr/CH/live/empty/no-questions.jpg"
      let SendObj={
        "UserID":User_ID,
        "QR_ID":qr_id,
        "Q_Link":Ques_Curr_Link,
       
        "qr_status":"1" ,
        "question-status":"2"
      }

      res.send(SendObj)
    }
    else if (qr_id>=111 && qr_id<=130){
    //  type.innerHTML="Jackpot Question"
     // points.innerHTML="5 pts"
      let Ques_Curr_Link="https://ik.imagekit.io/hrhrhr/CH/live/empty/no-questions3.jpg"
      let SendObj={
        "UserID":User_ID,
        "QR_ID":qr_id,
        "Q_Link":Ques_Curr_Link,
       
        "qr_status":"1" ,
        "question-status":"2"
      }

      res.send(SendObj)
    }
    else{
    
    }
    
    //let qr_id=qr_proxy[qr_id_proxy]
   

    const dbRef = ref(getDatabase());
    get(child(dbRef, `qrr_DB/${qr_id}/q_left`)).then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        let Q_left=snapshot.val()
        if (Q_left>0)
        {
// is q there in list starts

  const dbRef = ref(getDatabase());
  get(child(dbRef, `User_DB/${User_ID}/qs`)).then((snapshot) => {
    if (snapshot.exists()) {
      //console.log(snapshot.val());
      let arr =  snapshot.val()
      let qthere=0
     // console.log(qr_id)
      for (var i = 0; i < arr.length; i++) {
          if (arr[i] == qr_id)
          {//console.log('true');
            qthere=1
            console.log("qr code has questions and user has picked this")
            res.send({
             qr_status:"2"   
            })
          } 
      }
      if ( qthere ==0){
     // console.log('False')
     get(child(dbRef, `qrr_DB/${qr_id}`)).then((snapshot) => {
      if (snapshot.exists()) {

        let QR_Det =  snapshot.val()
        let Ques_tot=QR_Det["q_tot"]
        
        
        let ques_n=[Ques_tot - Q_left+1]      
        let Ques_Curr_Link="https://ik.imagekit.io/hrhrhr/CH/live/"+qr_id+"/q"+ques_n+".png"
        let SendObj={
          "UserID":User_ID,
          "QR_ID":qr_id,
          "Q_Link":Ques_Curr_Link,
          "Q_type":QR_Det["q_type"],
          "qr_status":"1" ,
          "question-status":"1",
          "qr-id":qr_id,
          "question-num":ques_n
        }

        res.send(SendObj)
        console.log("qr code has questions and user has not picked this yet")
        const db = getDatabase();
        const updates = {};
        updates[ `qrr_DB/${qr_id}/q_left`] = Q_left-1;
        updates[`User_DB/${User_ID}/qs/${arr.length}`] = parseInt(qr_id);
        update(ref(db), updates);

      }
     }).catch((e)=>console.log(e))
    
    
     
    }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  }); 
  // is q there in list ends

        }
        else{
          console.log("qr code is empty")
          res.send({
            "qr_status":"3"   
           })
        }
        //return snapshot.val()
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });



  })

