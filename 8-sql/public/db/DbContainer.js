import knex from "knex";
import { knexConfig } from "../config/knex.js";

class DbContainer {
  constructor(tablename) {
    this.knex = knex(knexConfig);
    this.table = tablename;
  }

  async all() {
    try {
      this.knex.initialize()
      const data = await this.knex.select('*').from(this.table);
      return data;
    } catch (error) {
      throw error;
    }finally {
      await this.knex.destroy()
    }
  }

  async save(entity) {
    try {
      this.knex.initialize()
      const newEntity = await this.knex(this.table).insert(entity, '*');
      return newEntity[0];
    } catch (error) {
      throw error
    }finally {
      await this.knex.destroy();
    }
  }

  async getById(id) {
    try {
      this.knex.initialize()
      const found = await this.knex.select('*').from(this.table).where('id',id);
      return found;
    } catch (error) {
      throw error
    }finally {
      await this.knex.destroy();
    }
  }

  async edit(id, changes) {
    try {
      this.knex.initialize()
      const updated = await this.knex(this.table).where('id', '=', id).update(changes, ['*']);
      return updated[0];
    } catch (error) {
      throw error
    }finally {
      await this.knex.destroy();
    }
  }

  async remove(id) {
    try {
      this.knex.initialize()
      await this.knex(this.table).where('id', '=', id).del();
    } catch (error) {
      throw error
    }finally {
      await this.knex.destroy();
    }
  }
}

export {DbContainer};