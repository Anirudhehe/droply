import {pgTable,text,boolean,integer,uuid,timestamp} from 'drizzle-orm/pg-core'
import {relations,InferSelectModel,InferInsertModel} from "drizzle-orm"



export const files = pgTable("files",{
    id: uuid("id").defaultRandom().primaryKey(),

    name:text("name").notNull(),
    path:text("path").notNull(),
    size:integer("size").notNull(),
    type:text('type').notNull(),
    //path_info goes here

    fileUrl: text("file_url").notNull(),
    thumbnailUrl:text("thumbnail_url"),

    //ownership info
    userId:text("user_id").notNull(),
    parentId:text("parent_id"), //is null for items in root folder

    //flags
    isFolder:boolean("is_folder").default(false).notNull(),
    isStarred:boolean("is_starred").default(false).notNull(),
    isTrash:boolean("is_trash").default(false).notNull(),

    //timestamps
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updatedAt:timestamp("updated_at").defaultNow().notNull(),
    
    


})

export const filesRelations = relations(files,({one,many})=>({
    parent: one(files,{
        fields: [files.parentId],
        references:[files.id]
    }),
    children:many(files)
}))

export const File = typeof files.$inferSelect
export const NewFile = typeof files.$inferInsert
