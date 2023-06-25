import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack'

import Cadastro from "../../app/login-pages/cadastro";
import Forgot from '../../app/login-pages/forgotPassword'
import Login from '../../app/login-pages/login'

import Home from '../../app/main-pages/home';
import AlterarSenha from '../../app/main-pages/alterarSenha';
import Configuracoes from '../../app/main-pages/configuracoes';
import EditarPerfil from '../../app/main-pages/editarPerfil';
import FaleConosco from '../../app/main-pages/faleConosco';
import ListaCategorias from '../../app/main-pages/listaCategorias';
import PublicarDiagnostico from '../../app/main-pages/publicarDiagnostico';
import PublicarPlantao from '../../app/main-pages/publicarPlantao';
import VerPerfil from '../../app/main-pages/verPerfil';
import VerPublicacao from '../../app/main-pages/verPublicacao';
import Shifts from '../../app/main-pages/shifts';
import ViewShift from '../../app/main-pages/viewShift';

import { useContext } from 'react';
import { AuthContext } from '@contexts/Auth';

export default function Routes() {
  const { Navigator, Screen } = createNativeStackNavigator()

  const { user } = useContext(AuthContext)

  const screenOptions = {
    headerShown: false,
    animation: 'fade'
  } as NativeStackNavigationOptions

  return (
    <Navigator screenOptions={screenOptions}>
      {user.id ? (
        <>
          <Screen name='home' component={Home} />
          <Screen name='updatePassword' component={AlterarSenha} />
          <Screen name='settings' component={Configuracoes} />
          <Screen name='editProfile' component={EditarPerfil} />
          <Screen name='contact' component={FaleConosco} />
          <Screen name='listCategories' component={ListaCategorias} />
          <Screen name='publishArticle' component={PublicarDiagnostico} />
          <Screen name='publishShift' component={PublicarPlantao} />
          <Screen name='shifts' component={Shifts} />
          <Screen name='viewProfile' component={VerPerfil} />
          <Screen name='viewPublication' component={VerPublicacao} />
          <Screen name='viewShift' component={ViewShift} />
        </>
      ): (
        <>
          <Screen name='login' component={Login} />
          <Screen name='register' component={Cadastro} />
          <Screen name='forgotPassword' component={Forgot} />
        </>
      )}
    </Navigator>
  )
}
