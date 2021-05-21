

export const Profile = ({userToken}) => {
  
    return(
        <div>
            <h1>Profile</h1>
            <p>User Name : {userToken.username}</p>
            <p>Admin status : {userToken.isAdmin? "Yes":"No"}</p>
        </div>
    )
}
