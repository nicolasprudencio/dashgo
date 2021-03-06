import {createServer, Factory, Model} from 'miragejs'
import faker, { date } from 'faker'


type User = {
  name: string,
  email: string,
  created_at: string,
}

// criando um fake back-end com miragejs

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `user ${i + 1}`
        },

        email() {
          return faker.internet.email().toLocaleLowerCase()
        },

        createdAt() {
          return faker.date.recent(10)
        },
      })
    },

    seeds(server) {
      server.createList('user', 200)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750;
      
      this.get('/users');
      this.post('/users');

      this.namespace= ''
      this.passthrough()
    }
  })

  return server;
}