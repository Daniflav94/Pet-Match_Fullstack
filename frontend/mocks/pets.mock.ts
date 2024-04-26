export const mockPets = {
    data: [
      {
        id: "d06646b4-3cb1-4fb6-8fcb-dc8563964248",
        type: "dog",
        name: "John",
        age: "Adulto",
        gender: "Macho",
        size: "Grande",
        photo: "1712931807456.jpeg",
        isAdopt: false,
        personality: ["Alegre", "Carinhoso(a)"],
        organizationId: "d4ab8aed-0109-4576-ad44-378d0351c10c",
        createdAt: new Date(),
        deletedAt: null,
      },
    ],
    total: 1
  };

  export const mockAllPets = {
    data: [
      {
        "id": "e0dc4188-cec0-4480-975e-52383486c09f",
        "type": "cat",
        "name": "Marie",
        "age": "Adulto",
        "gender": "Fêmea",
        "size": "Médio",
        "photo": "1712721466172.jpeg",
        "isAdopt": false,
        "personality": [
            "Carinhoso(a)",
            "Amigável"
        ],
        "organizationId": "d4ab8aed-0109-4576-ad44-378d0351c10c",
        "createdAt": "2024-04-10T03:57:46.180Z",
        "deletedAt": null,
        "organization": {
            "id": "d4ab8aed-0109-4576-ad44-378d0351c10c",
            "name": "Clube dos Viralatas",
            "email": "clube@email.com",
            "password": "$2a$10$SgWUuHmC.cQ51O3l0K7KdONl37z0AnC7zeGto4rF0GapAnbMNO6.6",
            "cnpj": "05.299.525/0001-93",
            "phone": "(11) 12345-678",
            "cellPhone": "(11) 91234-5678",
            "photo": "1712693269093.png",
            "cep": "08630-350",
            "state": "SP",
            "city": "Suzano",
            "street": "Rua Cinco",
            "neighborhood": "Jardim Maria Emília",
            "number": "123",
            "openingHours": "Segunda a sexta, 08h ás 17h",
            "type": "admin",
            "createdAt": "2024-04-09T20:07:49.308Z"
        }
    },
    ]
  }

  export const mockFavoritesPets = {
    "data": [
        {
            "id": "64e3ec5d-ad87-4b10-afc8-96ce657f2cd7",
            "petId": "1980b8d3-1a59-4691-9647-f18346248f5e",
            "userId": "890d0e20-61e2-4257-85f9-eec944759b6b",
            "pet": {
                "id": "1980b8d3-1a59-4691-9647-f18346248f5e",
                "type": "dog",
                "name": "Lupi",
                "age": "adulto",
                "gender": "Macho",
                "size": "Pequeno",
                "photo": "1712721872332.jpeg",
                "isAdopt": false,
                "personality": [
                    "Companheiro(a)",
                    "Sociável"
                ],
                "organizationId": "d4ab8aed-0109-4576-ad44-378d0351c10c",
                "createdAt": new Date(),
                "deletedAt": null
            }
        },
        {
            "id": "a2adf726-1f0b-49fb-bfba-d7c947a4c3b8",
            "petId": "dcf931d9-62ef-44e0-8a83-9e67fc6e0ace",
            "userId": "890d0e20-61e2-4257-85f9-eec944759b6b",
            "pet": {
                "id": "dcf931d9-62ef-44e0-8a83-9e67fc6e0ace",
                "type": "cat",
                "name": "Nino",
                "age": "Filhote",
                "gender": "Macho",
                "size": "Médio",
                "photo": "1712721519065.jpeg",
                "isAdopt": false,
                "personality": [
                    "Brincalhão",
                    "Carinhoso(a)"
                ],
                "organizationId": "d4ab8aed-0109-4576-ad44-378d0351c10c",
                "createdAt": new Date(),
                "deletedAt": null
            }
        },
        {
            "id": "dbe56883-c383-4b05-8f19-b79d1ae91006",
            "petId": "d06646b4-3cb1-4fb6-8fcb-dc8563964248",
            "userId": "890d0e20-61e2-4257-85f9-eec944759b6b",
            "pet": {
                "id": "d06646b4-3cb1-4fb6-8fcb-dc8563964248",
                "type": "dog",
                "name": "John",
                "age": "Adulto",
                "gender": "Macho",
                "size": "Grande",
                "photo": "1712931807456.jpeg",
                "isAdopt": false,
                "personality": [
                    "Alegre",
                    "Carinhoso(a)"
                ],
                "organizationId": "d4ab8aed-0109-4576-ad44-378d0351c10c",
                "createdAt": new Date(),
                "deletedAt": null
            }
        }
    ]
}