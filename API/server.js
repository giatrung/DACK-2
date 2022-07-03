const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()

const router = jsonServer.router('./db.json')

const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))

const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3000;

let user = {};

server.use(middlewares);


server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

const SECRET_KEY = '123456789'
const expiresIn = '1h'

function createToken(payload) {
  return jwt.sign(
    payload,
    SECRET_KEY,
    { expiresIn })
}

function verifyToken(token) {
  return jwt.verify(
    token,
    SECRET_KEY,
    (err, decode) => decode !== undefined ? decode : err)
}

function isAuthenticated({ email, password }) {
  return db.users.findIndex(user => user.email === email && user.password === password) !== -1
}

server.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  
  console.log(req.body)
  if(!name || !email || !password)
  {
    return res.status(401).json({
      status: 401,
      message: "Need field name, email, password!",
    })
  }
    if(password.length<3)
    {
      return res.status(401).json({
        status: 401,
        message: "password has least 3 character",
      })
    }
  
    if(email.includes('@')==false){
      return res.status(401).json({
        status: 401,
        message: "Email is invalid!",
      })
    }

  let exist_user = db.users.findIndex(x => x.email === email)
  if (exist_user !== -1) {
    return res.status(401).json({
      status: 401,
      message: "Email already in use!",
    })
  }

  const new_user = {
    'id': db.users.length + 1,
    name,
    email,
    password
  }

  db.users.push(new_user);
  fs.writeFileSync('./db.json', JSON.stringify(db), () => {
    if (err) return console.log(err);
    console.log('writing to ' + fileName);
  })
  res.status(201).json({
    status: 201,
    message: "Success",
    data: new_user
  })
})

//login
server.post('/login', (req, res) => {
  // const {email, password} = req.body
  const email = req.body.email
  const password = req.body.password

  if(email.includes('@')==false || email==""){
    return res.status(401).json({
      status: 401,
      message: "Email is invalid!",
    })
  }

  if(password=="")
  {
    return res.status(401).json({
      status: 401,
      message: "Password can not empty!",
    })
  }

  if (isAuthenticated({ email, password }) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({ status, message })
    return
  }
  let index =  db.users.findIndex(user => user.email == email)
  user = db.users[index]
  const access_token = createToken({ email, password })
  res.status(200).json({
    status: 200,
    message: "Success",
    data: {
      access_token
    }
  })
})

server.use('/auth', (req, res, next) => {
  if (req.headers.authorization == undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({ status, message })
    return
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Error: access_token is not valid'
      res.status(status).json({ status, message })
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = 'Token đã hết hạn'
    res.status(status).json({ status, message })
  }
})


//
/**
 * Filter products
 * @params size, price, category, color, sortType, sort
 */
server.get('/products', ((req, res) => {
  //let userdb = JSON.parse(fs.rea  dFileSync('./database.json', 'UTF-8'));
  const size = req.query.size ?? null;
  const price1 = req.query.price ?? 0;
  const price2 = req.query.price ?? 2000000;
  const category = req.query.category ?? null;
  const color = req.query.color ?? null;
  const sortType = req.query.sortType ?? null;
  const sort1 = req.query.sort ?? 'true';
  let result = db.products;
  
  if (sortType == null) {
    if(size)
    {
      result = result.filter(
        product => product.size == size
      )
    }
    if(price1 && price2)
    result = result.filter(
        product => product.price >= price1 && product.price <= price2
    )
    if(category)
    result = result.filter(
        product => product.category == category
    )
    if(color)
    result = result.filter(
        product => product.color == color
    )
  } else {
    /**
     * sortType
     * 0: all
     * 1: Tồn kho
     * 2: Giá
     * 3: Tên
     * 4: Mới, Cũ nhất
     * 5: Bán chạy nhất
     */
    /**
     * sort
     * true: asc
     * false: desc
     */
    switch (sortType) {
      case '1':
      result = result.sort((x, y) => {
        if (sort1 == 'true')
          return x.quantity - y.quantity;
        return y.quantity - x.quantity
      })
      ; break;
      case '2': result = result.sort((x, y) => {
          if (sort1 == 'true')
            return x.price - y.price;
        return y.price - x.price;
      }); break;
      case '3': result = result.sort((a, b) => {
        let fa = a.name.charAt(0).toLowerCase();
        let fb = b.name.charAt(0).toLowerCase();
        let res = sort1 == 'true' ? 1 : -1
        if (fa < fb) {
          return res;
        }
        if (fa > fb) {
          return -res;
        }
        return 0;
      }); break;
      case '4': result = result.sort((x, y) => {
        if (sort1 == 'true')
          return new Date(x.created_at) - new Date(a.created_at);
        return new Date(y.created_at) - new Date(x.created_at)
      }); break;
      case '5': result = result.sort((x, y) => {
        if (sort1 == 'true')
          return x.soldQuantity - y.soldQuantity;
        return y.soldQuantity - x.soldQuantity
      }); break;
      default:
        {
          return result
        }
    }
  }
  const status = 200
  return res.status(status).json({ status, result })
}))


//get user info

//add new order
server.post('/auth/orders', (req, res) => {
  const { shoesId, quantity,customerName, user_id } = req.body

  const exist_shoes_id = db.products.findIndex(product => product.id === shoesId)
  console.log(exist_shoes_id);
  if (exist_shoes_id === -1) {
    return res.status(401).json({
      status: 401,
      message: "shoes not found!!",
    })
  }

  const order_shoes = db.products[exist_shoes_id]
  if (order_shoes.available) {
    if(order_shoes.quantity < quantity){
      return res.status(401).json({
        status: 401,
        message: `Just have only ${order_shoes.quantity}!`,
      })
    }

    const new_order = {
      user_id:user_id,
      id: db.orders.length + 1,
      shoesId,
      customerName:customerName,
      quantity: quantity,
      timestamp: new Date().getTime(),
      total: order_shoes.price * Number(quantity),
      email: user.email
    }

    db.orders.push(new_order)
    db.products[exist_shoes_id].quantity = db.products[exist_shoes_id].quantity - quantity
    db.products[exist_shoes_id].soldQuantity = db.products[exist_shoes_id].soldQuantity + quantity
    if(db.products[exist_shoes_id].quantity ==0){
      db.products[exist_shoes_id].available = false
    }

    fs.writeFileSync('./db.json', JSON.stringify(db), () => {
      if (err) return console.log(err);
      console.log('writing to ' + fileName);
    })
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: new_order
    })
  } else {
    return res.status(401).json({
      status: 401,
      message: "This shoes is out of stock!!",
    })
  }
})


server.post('/orders', (req, res) => {
  const { shoesId, quantity, customerName, email } = req.body

  const exist_shoes_id = db.products.findIndex(product => product.id === shoesId)
  console.log(exist_shoes_id);
  if (exist_shoes_id === -1) {
    return res.status(401).json({
      status: 401,
      message: "shoes not found!!",
    })
  }
  if(!customerName || !email){
    return res.status(401).json({
      status: 401,
      message: `customer name, email is required`,
    })
  }

  const order_shoes = db.products[exist_shoes_id]
  if (order_shoes.available) {
    if(order_shoes.quantity < quantity){
      return res.status(401).json({
        status: 401,
        message: `Just have only ${order_shoes.quantity}!`,
      })
    }
    const new_order = {
      'id': db.orders.length + 1,
      shoesId,
      customerName: customerName,
      "quantity": quantity,
      "timestamp": new Date().getTime(),
      "total": order_shoes.price * Number(quantity),
      email: email
    }

    db.orders.push(new_order)
    db.products[exist_shoes_id].quantity = db.products[exist_shoes_id].quantity - quantity
    db.products[exist_shoes_id].soldQuantity = db.products[exist_shoes_id].soldQuantity + quantity
    if(db.products[exist_shoes_id].quantity ==0){
      db.products[exist_shoes_id].available = false
    }

    fs.writeFileSync('./db.json', JSON.stringify(db), () => {
      if (err) return console.log(err);
      console.log('writing to ' + fileName);
    })
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: new_order
    })
  } else {
    return res.status(401).json({
      status: 401,
      message: "This shoes is out of stock!!",
    })
  }
})

server.get('/orders', (req, res) => {
  const orderId = req.body.orderId ?? null;
  const email =req.body.email ?? null;
  let result = db.orders;
  if(orderId !=null && email !=null){
    result = db.orders.filter(order => order.email == email && order.id == orderId)
    if(result.length==0){
      return res.status(401).json({
        status: 401,
        message: "This user does'nt have any orders !",
      })
    }
  }
  else{
    return res.status(401).json({
      status: 401,
      message: "Need field email, orderId !",
    })
  }

  res.status(200).json({
    status: 200,
    message: "Success",
    data: {
      "orders": result
    }
  })
})

server.get('/auth/orders', (req, res) => {
  const user_id = req.body.user_id ?? null;
  if(!user_id){
    return res.status(401).json({
      status: 401,
      message: "Need user_id !",
    })
  }
  let result = db.orders;
  if( user_id){
    result = db.orders.filter(order => order.user_id == user_id)
  }
  else{
    return res.status(401).json({
      status: 401,
      message: "Need field email, orderId !",
    })
  }

  res.status(200).json({
    status: 200,
    message: "Success",
    data: {
      "orders": result
    }
  })
})
//delete order by id
server.delete('/auth/orders/:id', (req, res) => {
  const order_id = req.params.id

  const exist_order = db.orders.findIndex(order => order.id == order_id)
  if (exist_order !== -1) {
    db.orders.splice(exist_order, 1);

    fs.writeFileSync('./db.json', JSON.stringify(db), () => {
      if (err) return console.log(err);
      console.log('writing to ' + fileName);
    })

    return res.status(200).json({
      status: 200,
      message: "Success",
    })
  } else {
    return res.status(401).json({
      status: 401,
      message: "Order not found!!",
    })
  }

})


//Tìm shop theo tên
server.get('/shops', ((req, res)=> {
  //let userdb = JSON.parse(fs.rea  dFileSync('./database.json', 'UTF-8'));
	const branch = req.query.branch;
 
	const result = db.shops.filter(shops =>  shops.branch.includes(branch) == true)

	const status = 200
	return res.status(status).json({status, result})
}))
//-----------------------------------------------------------------------------------------


server.use(router)

server.listen(PORT, () => {
  console.log('Run Auth API Server')
})