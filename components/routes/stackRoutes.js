import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Loading from '../Pages/Loading';
import Entrar from '../Pages/Entrar';
import Cadastro from '../Pages/Cadastro';
import Login from '../Pages/Login';
import Rastrear from '../Pages/Explorar';
import Perfil from '../Pages/Perfil';
import PreCadastro from '../Pages/PreCadastro';
import CadastroLoja from '../Pages/CadastroLoja';
import IconB from '../img/BatePapo.svg';
import User from '../img/User';
import Lupa from '../img/Lupa';
import Explorar from '../Pages/Explorar';
import Conversas from '../Pages/Conversas';
import Carrinho from '../Pages/Carrinho';
import PerfilLoja from '../Pages/PerfilLoja';
import ConversasLoja from '../Pages/ConversasLoja';
import Wallet from '../img/Wallett.svg';
import Vendas from '../Pages/Vendas';
import Produto from '../Pages/Produto';
import Estoque from '../Pages/Estoque';
import Gerencia from '../Pages/Gerencia';

// Cria uma instância do TabNavigator
const Tab = createBottomTabNavigator();

const SecondTab = createBottomTabNavigator();

// Cria uma instância do StackNavigator
const Stack = createStackNavigator();

// Definição das rotas para o StackNavigator
function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              })
            }
          };
        },
      }}
    >
      <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
      <Stack.Screen name="Entrar" component={Entrar} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="PreCadastro" component={PreCadastro} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroLoja" component={CadastroLoja} options={{ headerShown: false }} />
      <Stack.Screen name="Carrinho" component={Carrinho} options={{ headerShown: false }} />
      <Stack.Screen name="Produto" component={Produto} options={{ headerShown: false }} />
      <Stack.Screen name="Estoque" component={Estoque} options={{ headerShown: false }} />
      <Stack.Screen name="Gerencia" component={Gerencia} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Definição das rotas para o TabNavigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 5
        },
        tabBarStyle: {
          backgroundColor: '#f7f7f7',
          height: 90,
          width: 460,
          alignSelf: 'center',
          borderRadius: 30,
          marginBottom: 10,
          borderTopColor: '#000',
          borderTopWidth: 1
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Conversas}
        options={{
          title: 'Conversas',
          tabBarIcon: ({ color, size }) => {
            return <IconB />;
          },
        }}
      />
      <Tab.Screen
        name="Explorar"
        component={Explorar}
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, size }) => {
            return <Lupa />;
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => {
            return <User style={{ marginTop: 5 }} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function SecondTabNavigator() {
  return (
    <SecondTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 5
        },
        tabBarStyle: {
          backgroundColor: '#f7f7f7',
          height: 90,
          width: 460,
          alignSelf: 'center',
          borderRadius: 30,
          marginBottom: 10,
          borderTopColor: '#000',
          borderTopWidth: 1
        },
      }}
    >
      <SecondTab.Screen
        name="ConversasLoja"
        component={ConversasLoja}
        options={{
          title: 'Conversas',
          tabBarIcon: ({ color, size }) => {
            return <IconB />;
          },
        }}
      />
      <SecondTab.Screen
        name="Vendas"
        component={Vendas}
        options={{
          title: 'Vendas',
          tabBarIcon: ({ color, size }) => {
            return <Wallet />;
          },
        }}
      />
      <SecondTab.Screen
        name="PerfilLoja"
        component={PerfilLoja}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => {
            return <User style={{ marginTop: 5 }} />;
          },
        }}
      />
    </SecondTab.Navigator>
  );
}

// Componente principal que define as rotas da aplicação
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StackRoutes" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StackRoutes" component={StackRoutes} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="SecondTabNavigator" component={SecondTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}