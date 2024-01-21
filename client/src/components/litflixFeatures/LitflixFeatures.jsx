import { Bookmark, BookmarkBorder, Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material"
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchUserByIDFailure, searchUserByIDStart, searchUserByIDSuccess } from "../../redux/userSlice/userSlice";


const LitflixFeatures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchUserById = async () => {
    try {
      dispatch(searchUserByIDStart());
      const res = await fetch(`/api/user/search-user/${import.meta.env.VITE_LITFLIXOFFICIAL_ID}`, { method: 'GET' });
      const data = await res.json();
      if(data.success===false) {
        dispatch(searchUserByIDFailure(data));
        return;
      };
      dispatch(searchUserByIDSuccess(data));
      navigate('/user-profile')
    } catch (error) {
      dispatch(searchUserByIDFailure(error))
    }
  };
  return (
    <Card sx={{ maxWidth: 600, minWidth:300 }}>
      <CardHeader
        avatar={
          <Avatar onClick={searchUserById} sx={{cursor:'pointer'}} aria-label="litflix" src='https://images.pexels.com/photos/5049212/pexels-photo-5049212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title='LitFlix Official'
        subheader='Jan 21, 2024'
      />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Introducing LitFlix - Your Social Media Hub for Connection and Expression!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Key Features:
        </Typography>
        <Typography variant="h6" color="text.secondary">
          🌐 Account Creation and Authentication
        </Typography>
        <Typography variant="p" color="text.secondary">
          Signing up with LitFlix is a breeze! Create your account effortlessly, and with secure authentication, your digital world is just a click away.
        </Typography>
        <Typography variant="h6" color="text.secondary">
          🔒 Login Options
        </Typography>
        <Typography variant="p" color="text.secondary">
          Choose your preferred login method - traditional email/password or the convenience of Google sign-in. We believe in flexibility, ensuring you access LitFlix your way.
        </Typography>
        <Typography variant="h6" color="text.secondary">
          ✨ Dynamic Profile Customization
        </Typography>
        <Typography variant="p" color="text.secondary">
          Express yourself in style! Personalize your profile with a range of customization options. From profile pictures to cover photos, LitFlix lets you showcase your personality.
        </Typography>
        <Typography variant="h6" color="text.secondary">
          🌓 Light and Dark Mode
        </Typography>
        <Typography variant="p" color="text.secondary">
          Adapt LitFlix to your mood and surroundings with our stylish light and dark mode options. Whether you prefer a sleek and modern look or a more subdued interface, LitFlix caters to your visual preferences.
        </Typography>
        <Typography variant="h6" color="text.secondary">
          📝 Post Management
        </Typography>
        <Typography variant="p" color="text.secondary">
          Share your thoughts, experiences, and creativity effortlessly. Create, edit, and delete your posts at your convenience. LitFlix ensures your content reflects your evolving narrative.
        </Typography>
        <Typography variant="h6" color="text.secondary">
          🔐 Password Management
        </Typography>
        <Typography variant="p" color="text.secondary">
          Security matters! Change your password seamlessly within the app to keep your account safe and sound.
        </Typography>
        <Typography variant="h6" color="text.secondary">
          🕵️‍♂️ Profile Stalking
        </Typography>
        <Typography variant="p" color="text.secondary">
          Curiosity piqued? Explore other users' profiles and stay in the loop with their latest updates. LitFlix encourages connection and discovery.
        </Typography>
        <Typography variant="h6" color="text.secondary">
          🔄 Constant Innovation
        </Typography>
        <Typography variant="p" color="text.secondary">
          LitFlix is not static; it's a living platform that evolves with your needs. Expect regular updates and new features to keep your experience fresh and exciting.
        </Typography>

        <Typography variant="h6" color="text.secondary">
          Apology for Inconvenience:
        </Typography>
        <Typography variant="p" fontWeight={500} color="text.secondary">
          We Apologize for the Inconvenience:
        </Typography>
        <Typography variant="p" color="text.secondary">
          As we utilize the free service of MongoDB, we're encountering connectivity limitations, leading to potential disruption in your LitFlix experience. We sincerely apologize for any inconvenience and appreciate your understanding as we work towards a swift resolution.
        </Typography>
      </CardContent>
      <CardActions disableSpacing >
        <IconButton aria-label="add to favorites">
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite color='error'/>} />
        </IconButton>
        <IconButton aria-label="share">
          <Checkbox icon={<BookmarkBorder/>} checkedIcon={<Bookmark sx={{color:['#ffc107']}}/>}/>
        </IconButton>
        <IconButton aria-label="share" sx={{ml:'auto'}}>
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default LitflixFeatures