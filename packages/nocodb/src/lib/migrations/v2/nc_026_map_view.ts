import { Knex } from 'knex';
import { MetaTable } from '../../utils/globals';

const up = async (knex: Knex) => {
  await knex.schema.createTable(MetaTable.MAP_VIEW, (table) => {
    table.string('fk_view_id', 20).primary();
    table.foreign('fk_view_id').references(`${MetaTable.VIEWS}.id`);

    table.string('base_id', 20);
    table.foreign('base_id').references(`${MetaTable.BASES}.id`);

    table.string('project_id', 128);
    table.foreign('project_id').references(`${MetaTable.PROJECT}.id`);

    table.string('uuid');
    table.string('title');

    table.string('fk_geo_data_col_id', 20);
    table.foreign('fk_geo_data_col_id').references(`${MetaTable.COLUMNS}.id`);

    table.text('meta');

    table.dateTime('created_at');
    table.dateTime('updated_at');
  });

  await knex.schema.createTable(MetaTable.MAP_VIEW_COLUMNS, (table) => {
    table.string('id', 20).primary().notNullable();

    table.string('base_id', 20);
    table.string('project_id', 128);

    table.string('fk_view_id', 20);
    table.foreign('fk_view_id').references(`${MetaTable.MAP_VIEW}.fk_view_id`);
    table.string('fk_column_id', 20);
    table.foreign('fk_column_id').references(`${MetaTable.COLUMNS}.id`);

    table.string('uuid');

    table.string('label');
    table.string('help');

    table.boolean('show');
    table.float('order');

    table.timestamps(true, true);
  });
};

const down = async (knex: Knex) => {
  await knex.schema.dropTable(MetaTable.MAP_VIEW);
  await knex.schema.dropTable(MetaTable.MAP_VIEW_COLUMNS);
};

export { up, down };
