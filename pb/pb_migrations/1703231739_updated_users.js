/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = " @request.auth.role = \"Admin\""
  collection.viewRule = " @request.auth.role = \"Admin\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = "id = @request.auth.id || @request.auth.role = \"Admin\""
  collection.viewRule = "id = @request.auth.id || @request.auth.role = \"Admin\""

  return dao.saveCollection(collection)
})
