
const createResponse = function(params) {
    params.ctx.status = params.statusCode || 200;
    params.ctx.body = {
        path:params.path || '',
        data: params.data || null,
        message: params.message || 'success',
        status: params.status || 200,
    };
}

module.exports = createResponse;