/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tvidk6q983l0cey")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ufydko3t",
    "name": "area",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "College of Informatics",
        "College of Business and Administration",
        "Registrar",
        "Computer Laboratory 9"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tvidk6q983l0cey")

  // remove
  collection.schema.removeField("ufydko3t")

  return dao.saveCollection(collection)
})
