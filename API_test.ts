Feature('Pruebas de APIs REST y GRAPHQL')

Scenario('Test REST GET',async ({I}) => {
    const response = await I.sendGetRequest(
        'https://pokeapi.co/api/v2/pokemon'
    )

    // Validamos el código de respuesta 200
    I.assertEqual(response?.status, 200)

    // Validación sobre la data de forma individual
    I.assertEqual(response?.data?.results?.[0].name, 'bulbasaur')
    
})

Scenario('Test GRAPHQL GET',async ({I}) => {
    const response = await I.sendQuery(`
    query pokemon($name: String!) {
        pokemon(name: $name) {
          id
          name
          sprites {
            front_default
          }
          moves {
            move {
              name
            }
          }
          types {
            type {
              name
            }
          }
        }
      }`,
    {"name": "pikachu"},{},{})

    // Validacion del estatus 200
    I.assertEqual(response?.status, 200)

    // Validamos que pikachu no tiene el id 10, sabemos que es el 25
    I.assertNotEqual(response?.data?.data?.pokemon?.id, 10)
})