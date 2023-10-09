import Profile from "../model/profile.js";



//   for creating profile details

export const createProfile = async(req,res) =>{
    try {
        const {userId,name,contact,address} = req.body;
        if(!name || name=== undefined || name===null || name === ""){
            return res.status(500).json({message:"Please enter a name"})
        }
        else if(!contact || contact=== undefined || contact===null || contact === ""){
            return res.status(500).json({message:"Please enter a contact number"})
        }else  if(contact.length<=9){
            return res.status(500).json({message:"enter valid contact number"})
        }
        else if(!address || address=== undefined || address===null || address === ""){
            return res.status(500).json({message:"Please enter an address"})
        } else{
            const profileDetails = await Profile.create({userId,name,contact,address})
            console .log(profileDetails)
            return res.status(200).json({message:"Profile created successfully",profileDetails})
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}


// for updating profile details

export const updateProfile = async(req,res) =>{
    try {
        const profileDetails =  await Profile.findById(req.params.id);
        const {name,contact,address} = req.body;
        if(!profileDetails){
             return res.statsu(404).json({message:"profile not found"});
        }

        if(name){
            profileDetails.name = name;
        }
        if(contact){
            profileDetails.contact = contact;
        }
        if(address){
            profileDetails.address = address;
        }
        await profileDetails.save();
        return res.status(200).json({message:"Profile updated successfully",profileDetails});
        // console.log(profileDetails);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}


// for getting all profile details 

export const getProfileDetails = async(req,res) =>{
    try {
        const profileData = await Profile.find();
        return res.status(200).json({message:"profile details", profileData})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}



// for deleting profile details

export const deletingProfile = async(req,res) =>{
    try {
        await Profile.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"Profile deleted successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}