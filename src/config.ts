export const config = () => ({
    port: Number(process.env.PORT),
    database: {
      type: 'msyql',
      host: process.env.TYPEORM_HOST,
      port: 3306,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: process.env.TYPEORM_SYNCHRONIZE,
      logging: false,
      entities: [process.env.TYPEORM_ENTITIES]
    },
  })
  