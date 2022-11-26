export const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: `${process.cwd()}/public/db/db.sqlite`
    },
    useNullAsDefault: true,
    
    postProcessResponse: (result, _queryContext) => {
      if(Array.isArray(result)) {
        return result.map(row => {
          return JSON.parse(JSON.stringify(row));
        })
      } 
      return JSON.parse(JSON.stringify(result));
    }
  }