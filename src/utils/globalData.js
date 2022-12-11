import { customCupabaseClient } from "./supabaseClient"

export const getPrice= ()=> {
  return 200000
}

export const getDestinations= async ()=> {
  const { data }= await customCupabaseClient.from("destinations").select("name")

  return data.map(v=> v.name)
}

export const staticDestinations= [
  {
    destination: "Nusa Penida",
    description: "Nusa Penida is an island South-East of the Indonesian island Bali. Nusa Penida is only a thirty minute boat ride from Bali.",
    image: "/NusaPenida.png"
  },
  {
    destination: "Lembongan Island",
    description: "Nusa Lembongan is a small holiday island destination 20 km off the southeast coast of Bali. You can reach it with a 45-minute boat ride from Sanur Beach or Benoa Harbour. It’s a lot quieter than the south of Bali, making it a great place to go for a quiet, relaxing break.",
    image: "/Lembongan.png"
  },
  {
    destination: "Sanur Beach",
    description: "Sanur Beach is a beautiful white sandy beach with calm and warm seawater located in east part of Denpasar Town. This beach location in east side and south part of Sanur Village is an edge of Indonesia Ocean.",
    image: "/Sanur.png"
  }, 
  {
    destination: "Gili",
    description:  "White sandy beaches. Tropical coral reefs. Warm inviting waters. All this awaits you on the Gili Trawangan and the Gili islands in Lombok. And with no cars, no motorbikes, and no distractions other than beautiful tropical island scenery, the Gili islands off the northwest coast of Lombok are truly an ideal destination for a tropical getaway.",
    image: "/gili.jpg"
  }
]

export const staticReviews= [
  {
    review: "Excellent service fast boat to lembongan with arthamas express",
    name: "Maria",
  }, {
    review: "Great service",
    name: "Siti Nurbaya"
  }, {
    review: "Fast and good price",
    name: "Dadang"
  }, {
    review: "Great service with confortable fast boat and reasonable price",
    name: "Budha"
  }
]