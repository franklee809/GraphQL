// All property of table's column and object relationship in GraphQL

const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,      /* GraphQL object type */
    GraphQLString,          /* GraphQL string type */
    GraphQLInt,             /* GraphQL integer type */
    GraphQLSchema           /* return GraphQL schema */
}   = graphql;

const user = [
    {id:'23',firstname:'Bill',age : 20},
    {id:'47',firstname:'Samantha',age : 40},
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: { // Assigning datatype field
        id : { type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    } 

});

// RootQuery - Jump and land on specific node (eg. find the node with user id) 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        users:{
            type: UserType,
            args: {id:{type: GraphQLString},},
            /**  Resolve function - return user with given id  */
            resolve(parentValue,args){
                /** going into list of users and return the first user who has an id equal to args id */
                return _.find(user,{id:args.id});
            }
            
        }
    }
})

// Export this schema to the server
module.exports = new GraphQLSchema({
    query: RootQuery
})