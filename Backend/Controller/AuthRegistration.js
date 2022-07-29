const { Registration } = require("../MongoDb/models/Register");
const { UserDetals } = require("../MongoDb/models/Register");
const { address, nick, users } = require("../MongoDb/models/Register");
var jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;

//require("../MongoDb/models/Register");

const bcrypt = require("bcrypt");
const { mongo } = require("mongoose");

exports.AuthRegistration = async (req, res) => {
  try {
    const { email } = req.body;
    const userEmail = await Registration.findOne({ email: email });
    if (userEmail) {
      res.status(400).json({ message: "Email is already present.." });
    }

    // return Registration.updateOne({resetLink:tokken},function(err,sucess){
    //   if(err){
    //     return res.status(400).json({error:"rest assword lik error"})
    //   }else{
    //     res.status(200).json({message:data})
    //   }
    // })

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
      console.log(Register);

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
    const d = await user.save();
    console.log(d);

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

exports.Delete = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const del = await UserDetals.findOneAndDelete({ user: user_id });
    res.status(200).json({ message: `dlete sucessfully ${del}` });
    console.log(del);
  } catch (err) {
    console.log(err);
  }
};

exports.Token = async (req, res, next) => {
  try {
    const { email } = req.body;

    const Checkemail = await Registration.findOne({ email: email });
    console.log(Checkemail);

    if (!Checkemail) {
      return res
        .status(400)
        .json({ error: "User of the email Doesn't exists..." });
    }

    const tokken = jwt.sign(
      {
        email: email,
      },
      process.env.Resetpassword,
      {
        expiresIn: "10m",
      }
    );

    const reg = await Checkemail.updateOne({ resetLink: tokken });
    if (!reg) {
      res.status(400).json({ error: " reset password link error" });
    } else {
      res
        .status(200)
        .json({ message: `password rest successfully ${Checkemail}` });
    }
  } catch (err) {
    console.log(err);
  }
};

//----------------------------------End Password reset generation Token----------------------//

exports.Verify = async (req, res) => {
  try {
    const token = req.params.password_reset_token;

    console.log(req.params.password_reset_token);
    if (token) {
      await jwt.verify(token, process.env.Resetpassword, (err, success) => {
        if (err) {
          return res.status(400).json({ error: "Tokken was not verify..." });
        } else {
          return res
            .status(200)
            .json({ message: "Tokken verify.....", success });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};
