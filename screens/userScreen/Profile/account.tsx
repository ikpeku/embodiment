
import { useAppSelector } from '../../../redux/hooks';
import { UserState } from '../../../redux/features/useSlice';

import UserProfile from '../../../components/userProfile';
import DoctorProfile from '../../../components/doctorProfile';

export default function Editprofile() {


    const { user } = useAppSelector(UserState)

  


    return (
        <> 
           { user.role === "isUser" && <UserProfile />}
           { user.role === "isDoctor" && <DoctorProfile />}
        </>
    )
}
