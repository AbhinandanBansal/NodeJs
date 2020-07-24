const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const 
{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

/*const movies = [
{"name":"Sully","genre":"Drama","rating":10,"language":"English"},
{"name":"End Game","genre":"Action","rating":6,"language":"English"},
{"name":"MI-4","genre":"Action","rating":7,"language":"English"},
{"name":"Disney Frozen-I","genre":"cartoon","rating":8,"language":"English"},
{"name":"Disney Frozen-II","genre":"cartoon","rating":9,"language":"English"}
]*/

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: {
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        genre: {type:GraphQLString},
        rating: {type:GraphQLInt},
        language: {type:GraphQLString}
    }
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields:{
        movie:{
            type:MovieType,
            args:{id:{type:GraphQLString}},
            resolve(parentValue,args){
                return  axios.get(`http://localhost:8900/movies/${args.id}`)
                .then(resp =>resp.data)
                //return _.find(movies,{name:args.name})

            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields:{
        addMovie:{
            type:MovieType,
            args:{
                    id:{type:GraphQLString},
                    name: {type:GraphQLString},
                    genre: {type:GraphQLString},
                    rating: {type:GraphQLInt},
                    language: {type:GraphQLString}
                },
            resolve(parentValue,{id,name,genre,rating,language}){
                return  axios.post('http://localhost:8900/movies',{id,name,genre,rating,language})
                .then(resp =>resp.data)
                //return _.find(movies,{name:args.name})

            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})