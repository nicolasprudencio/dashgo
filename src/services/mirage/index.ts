import {createServer, Factory, Model, Response, ActiveModelSerializer} from 'miragejs'
import faker, { date } from 'faker'


type User = {
  name: string,
  email: string,
  created_at: string,
}

// criando um fake back-end com miragejs e faker

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

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
      this.namespace = 'api';
      this.timing = 750;
      
      this.get('/users', function (schema, request) {
        // função de paginação do mirage
        
        const { page = 1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
        .users.slice(pageStart, pageEnd)

        return new Response(
          200,
          {'x-total-count': String(total)},
          { users }
        )
      });
      
      this.get('/users/:id');
      this.post('/users');

      this.namespace= ''
      this.passthrough()
    }
  })

  return server;
}