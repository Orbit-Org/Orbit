import { neo } from "config"
import { randomInt } from "crypto"
import { QueryResult } from "neo4j-driver"

export class MeteorAlgorithm {
   constructor() { }
   public Meteor = async (uid: string): Promise<string> => {
      return new Promise(async (resolve, reject) => {
         await neo().executeRead(tx => tx.run("MATCH (u:User{name : $uid})-[:Friend]-(t:User) return t.name as names", { uid: uid })).then((result: QueryResult) => {
            const names: string[] = result.records.map(record => record.get("names"))
            if (names.length === 0) return resolve("No friends found")
            else return resolve(names[randomInt(0, names.length)])
         }).catch((error: Error) => { return reject(error) })
      })
   }
}