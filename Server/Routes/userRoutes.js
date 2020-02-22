const Router = require('koa-router');
const userService = require('../service/user');
const createResponse = require('../utils/response');

const userRoutes = new Router(
    {
        prefix:'/api/users'
    }
);

userRoutes
//Post
    .post('/login',async (ctx)=>{
        const { userName,password } = ctx.request.body;
        try{
            let data = await userService.findAndValidUser(userName,password);
            //console.log(data)
            if(data.valid){

                createResponse({
                    ctx,
                    data:data._id,
                    path: '/login'
                })

            }
            else{
                createResponse({
                    ctx,
                    message:"password error",
                    status: 400
                })
            }
        }
        catch(error){
            createResponse({
                ctx,
                message: 'faliure',
            })
        }

    })
    .post('/resgister',async (ctx)=>{
        const { userName,password } = ctx.request.body;
        try{
            const res = await userService.addUser(userName,password);
            if(res){
                createResponse({
                    ctx,
                    data: res,
                    path: '/resgister'
                })
            }
            else{
                createResponse({
                    ctx,
                    message: 'log in faliure',
                    status: 400
                })
            }

        }
        catch(error) {
            createResponse({
                ctx,
                message:'register faliure',
                status: 400
            })
        }

    })

module.exports = exports = userRoutes; 