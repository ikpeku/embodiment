import { StyleSheet, View} from 'react-native'
import { useRoute } from '@react-navigation/native';
import { QuestionnairelRouteProp } from '../../../types';
import UTITREATMENT from '../../../components/userQuestionaire/UTITREATMENT';
import MIGRAINETREATMENT from '../../../components/userQuestionaire/MIGRAINETREATMENT';
import ERECTILEDYSFUNCTION from '../../../components/userQuestionaire/ERECTILEDYSFUNCTION';
import PREMATUREEJACULATION from '../../../components/userQuestionaire/PREMATUREEJACULATION';
import ACNETREATMENT from '../../../components/userQuestionaire/ACNETREATMENT';
import ANXIETYANDDEPRESSION from '../../../components/userQuestionaire/ANXIETYANDDEPRESSION';
import GASTRITIS from '../../../components/userQuestionaire/GASTRITIS';
import COMMONCOLD from '../../../components/userQuestionaire/COMMONCOLD';
import MALARIA from '../../../components/userQuestionaire/MALARIA';
import TYPHOIDFEVER from '../../../components/userQuestionaire/TYPHOIDFEVER';




const Questionnaire = () => {

    const { id } = useRoute<QuestionnairelRouteProp>().params

    return (
        <View style={styles.root} >

            {id === "6504f684d4c2c22773c99349" && <UTITREATMENT diseaseId={id} />}
            {id === "6504f793d4c2c22773c9934c" && <MIGRAINETREATMENT diseaseId={id} />}
            {id === "6504f7f0d4c2c22773c9934f" && <ERECTILEDYSFUNCTION diseaseId={id} />}
            {id === "6504f87cd4c2c22773c99351" && <PREMATUREEJACULATION diseaseId={id} />}
            {id === "6504f8d1d4c2c22773c99353" && <ACNETREATMENT diseaseId={id} />}
            {id === "6504f92ad4c2c22773c99355" && <ANXIETYANDDEPRESSION diseaseId={id} />}
            {id === "6504f973d4c2c22773c99357" && <GASTRITIS diseaseId={id} />}
            {id === "6504fa77d4c2c22773c99359" && <COMMONCOLD diseaseId={id} />}
            {id === "65666a47be61c51e8ffdf87b" && <MALARIA diseaseId={id} />}
            {id === "6504fac9d4c2c22773c9935d" && <TYPHOIDFEVER diseaseId={id} />}
            
        </View>

    )
}

export default Questionnaire

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10
    }
})


