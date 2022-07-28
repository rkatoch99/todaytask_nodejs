const Registration = require("../MongoDb/models/Register");
const { UserDetals } = require("../MongoDb/models/Register");
const { address, nick, users } = require("../MongoDb/models/Register");
var jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;

//require("../MongoDb/models/Register");

const bcrypt = require("bcrypt");

exports.AuthRegistration = async (req, res) => {
  try {
    const { email } = req.body;
    const userEmail = await Registration.findOne({ email: email });
    if (userEmail) {
      res.status(400).json({ message: "Email is already present.." });
    }
    const password = req.body.password;
    const Confirmpassword = req.body.Confirmpassword;

    if (password === Confirmpassword) {
      const passwordHash = await bcrypt.hash(password, 10);
      const Register = new Registration({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: passwordHash,
      });

      const save = await Register.save();
      if (save) {
        res.status(201).json({ message: "data save successfully..." });
      }
    } else {
      console.log("password incorrect..");
    }
  } catch (errr) {
    console.log(errr);
  }
};

exports.AuthLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next("password and username both are required...");
  }

  try {
    const user = await Registration.findOne({ username: req.body.username });

    if (!user)
      return res.status(400).json({ error: "Username is not match...." });

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(comparePassword);

    if (!comparePassword) {
      return res.status(400).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    //signing token with user id
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.API_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // save the user token

    user.token = token;

    //responding request with user profile success message and  access token .
    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
      },
      message: "Login successfull",
      accessToken: token,
    });

    // return res.status(200).json({message:"Login sucessfully"});
  } catch (err) {
    console.log(err);
    alert(err.message);
    return next("error : ", err);
  }
};

exports.AuthUserDetails = async (req, res) => {
  try {
    const { user_id, address, city, state, pincode, phone } = req.body;

    const RegisterUser = new UserDetals({
      user_id: user_id,
      address: address,
      city,
      state,
      pincode,
      phone,
    });

    // const save = await RegisterUser.save()
    //   console.log("first save", save)

    const save = await RegisterUser.save();
    console.log("first save", save);
    // console.log(add)

    // const save = await RegisterUser.save()
    // console.log("first save", save)

    if (save) {
      return res.status(200).json({ message: "Data save successfully..." });
    }
    console.log(save);
  } catch (err) {
    console.log(err);
  }
};

exports.Addressupdate = async (req, res) => {
  try {
    const { houseNum, street, citys, states, country, user_id } = req.body;
    const ADDdetails = new address({
      user_id: user_id,
      houseNum: houseNum,
      user_id: user_id,
      street: street,
      citys,
      states,
      country,
    });
    // console.log("Address ", ADDdetails)

    //   const addres = await ADDdetails.find({ id:id}).populate(address)
    // if(addres){
    //   return res.status(200).json({message:addres})
    // }
    const save = await ADDdetails.save();
    const user = await UserDetals.findOne({ user_id });

    console.log("save wala data", save);

    console.log("id", user);

    user.Address.push(save);
    const d= await user.save()
    console.log(d)

    // console.log("data wala data ",Data)
    // res.json({ Address: save, id: save.user_id });

    const add = await UserDetals.findOne({ user: user_id })
      .populate("Address")
      .exec(); // key to populate

    console.log("Add wala data", add);

    // const add = UserDetals.findOne({user_id: user_id }).populate("Address") // key to populate
    // add.Addressupdate.push(save)
    if (add) {
      return res.status(200).json({ message: add });
    }
  } catch (err) {
    console.log(err);
  }
};

// exports.tempUser = async (req, res, next) => {
//   const { name } = req.body;
//   const user = new users({
//     name,
//   });
//   const u = user.save(function(err,result){
//     if(err){
//       return next(err)
//     }
//     return result; 
//   });
//   res.send(u); 
// };

// exports.nickNames = async (req, res, next) => {
//   const { nickName, name } = req.body;

//   res.send(await nick({ nickName, name }).save().catch(console.error));
// };
// exports.details = async (req, res, next) => {
//   const { name } = req.body;
//   res.send(
//     await users.findOne({ name }).populate("nicknames").catch(console.error)
//   );
// };
