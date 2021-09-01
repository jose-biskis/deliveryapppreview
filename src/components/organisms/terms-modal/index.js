import React, { useState } from 'react';
import { Modal, View, Text, FlatList, Platform  } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './style';

const TermsModal = ({isModalVisible, onModalClose, onCancel, onContinue, isInternalSignup }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    let components = [
        (
            <Text>
            TERMINOS Y CONDICIONES{"\n"}
            Los presentes términos y condiciones regulan los contenidos, productos y servicio que sea de propiedad o estén controlados por TUPEDIDO.CO S.A.S. (en adelante “TUPEDIDO.CO”). Este documento contiene información legal que le recomendamos leer completamente en conjunto con la política de privacidad. Al aceptar los presentes términos y condiciones, se entiende que el usuario los ha leído, en todas sus partes, y entiende que estos le son legalmente vinculantes y obligatorios. Por tanto, acepta las condiciones de utilización y aprovechamiento de la plataforma, contenido, productos y servicios. En caso contrario, el usuario deberá abstenerse de utilizar la plataforma y/o adquirir los productos y servicios que en esta sean ofrecidos.
            {"\n"}{"\n"}
            ACEPTACION DE TERMINOS Y CONDICIONES{"\n"}
            Mediante la creación de un perfil y/o la utilización en cualquier forma de los servicios ofrecidos en la plataforma, el usuario acepta todos los términos de uso aquí contenidos y la política de manejo de datos. Asimismo, se entiende que acepta todas las demás reglas de operación, políticas y procedimientos que puedan ser publicados por TUPEDIDO.CO en su plataforma. Sin perjuicio de lo anterior, algunos servicios que se ofrecen en la Plataforma pueden estar sujetos a términos y condiciones especiales.
            {"\n"}{"\n"}
            Teniendo en cuenta que TUPEDIDO.CO constantemente esta trabajando para mejorar la prestación de sus servicios, es posible que se realicen actualizaciones en estos términos y condiciones y en la política de tratamiento de datos, de acuerdo a la necesidad de nuestra operación y cumpliendo con el ordenamiento jurídico que nos rige. Cuando se presente esta situación TUPEDIDO.CO enviará al usuario un mensaje para que conozca y entienda las actualizaciones realizadas, si luego de la notificación el usuario continuo con la utilización de los servicios prestados en la plataforma de TUPEDIDO.CO se entenderá por aceptados los nuevos términos y condiciones y en consecuencia no habrá lugar a reclamación posterior respecto de la aplicación y exigencia de los mismos.
            {"\n"}{"\n"}
            DEFINICIONES{"\n"}
            Beneficio(s): promociones y descuentos que se otorgan al usuario con el objetivo de brindar mejores precios y mayores beneficios a estos. 
            Comercio(s): negocios minoristas afiliados a la plataforma en los cuales el usuario podrá adquirir productos. 
            Contenido: información, ya sea gráfica o escrita, imágenes, audio y video, incluyendo, pero no limitándose a la ubicación, anuncios, comentarios, noticias, datos, guiones, gráficos, dibujos o imágenes, textos, diseño, esquemas, mapas y características interactivas presentadas por TUPEDIDO.CO en la plataforma y en cualquier canal administrado por TUPEDIDO.CO. 
            Equipo: significa los teléfonos móviles y smartphones, tablets, computadores y cualquier otro aparato electrónico por el cual se pueda acceder a la plataforma. 
            TUPEDIDO.CO: TUPEDIDO.CO S.A.S. Compañía de comercio electrónico la cual mediante medios tecnológicos y de servicio brinda a los Usuarios un catálogo digital de productos ofrecidos para la respectiva compra y el traslado de estos al destino indicado por el usuario. 
            Orden de Compra: el pedido particular de un usuario para la compra de determinados productos. 
            Perfil: cuenta personal única creada por un usuario que acredita el registro en la plataforma, la cual incluye su nombre, apellidos, fecha de nacimiento, dirección, teléfono, nombre de usuario, correo electrónico y contraseña. 
            Plataforma: sitio web (<Text style={{color: 'rgba(249,22,116,1)'}} onPress={() => Linking.openURL('https://www.tupedido.co')}>www.tupedido.co</Text>), aplicaciones móviles y plataforma operada por TUPEDIDO.CO, a través de los cuales los usuarios podrán acceder a los servicios ofrecidos. 
            Política de Privacidad: políticas de privacidad de TUPEDIDO.CO, las cuales se encuentran debidamente publicadas en la Plataforma. 
            Producto(s): productos ofrecidos en la plataforma por TUPEDIDO.CO y/o comercios como alimentos, canasta básica familiar, víveres, bebidas, bebidas alcohólicas, aseo, belleza, consumo masivo, tecnología, juguetería de mascotas, electrodomésticos y otros artículos de alimentación, en resumen, todos los artículos y productos que se encuentran disponibles para ser adquiridos por los usuarios. 
            Domiciliarios(es): personal contratado por TUPEDIDO.CO o de un tercero externo, que efectúa la entrega de los productos. 
            Servicios: significa todos los servicios ofrecidos por medio de la plataforma, así como los demás servicios provistos por TUPEDIDO.CO, a los cuales los usuarios pueden acceder por medio de la plataforma y sus equipos. 
            Términos y Condiciones: los presentes Términos y Condiciones de TUPEDIDO.CO. {"\n"}
            Usuario(s): toda persona natural o jurídica, que utilice o que se encuentra registrado como tal en la plataforma o haya creado un perfil en la misma. Un usuario sólo podrá crear un perfil, es decir la relación usuario-perfil es uno a uno.
            {"\n"}{"\n"}
            CUENTA DE USUARIO {"\n"}
            La persona que corresponde a un usuario el cual crea un perfil es la única persona autorizada para el acceso a la plataforma por intermedio de dicho usuario. El usuario es responsable de mantener la confidencialidad de cualquier contraseña o número de cuenta proporcionado por el usuario o TUPEDIDO.CO para acceder a la plataforma. Cada usuario es el único y absoluto responsable de todas las actividades que ocurran bajo su contraseña, cuenta o perfil. TUPEDIDO.CO no tiene control sobre el uso de la cuenta de un usuario y renuncia expresamente a cualquier responsabilidad derivada de la misma. En caso de que un usuario sospeche que un tercero pudiera estar accediendo a la plataforma bajo su cuenta de usuario o utilizando su contraseña, notificará a TUPEDIDO.CO inmediatamente.
            {"\n"}{"\n"}
            Si usted proporciona su número de teléfono celular, por ese hecho da su consentimiento para que TUPEDIDO.CO haga uso del mismo para llamadas, información de los pedidos, envío de mensajes de textos y notificaciones por whatsapp con el fin de ofrecer los servicios y promociones disponibles, aplican las Políticas de Privacidad. Si usted proporciona su correo electrónico, por ese hecho da su consentimiento para que TUPEDIDO.CO haga uso del mismo para envío de correos electrónicos con información de los pedidos y mensajes con el fin de ofrecer los servicios y promociones disponibles, aplican las Políticas de Privacidad. Usted puede optar por no recibir mensajes de texto, notificaciones por whatsapp y/o correos electrónicos desde TUPEDIDO.CO, enviando un correo electrónico a [servicioalcliente@tupedido.co].
            {"\n"}{"\n"}
            PROCESO DE COMPRA
            {"\n"}{"\n"}
            COBERTURA {"\n"}
            TUPEDIDO.CO cuenta con cobertura en las ciudades de Bogotá y sabana de Cundinamarca (Funza, Mosquera, Madrid), la cobertura dentro de Bogotá variar según el alcance logístico con el que cuente TUPEDIDO.CO para realizar las respectivas entregas de las compras realizadas por sus usuarios.{"\n"}
            DISPONIBILIDAD DE PRODUCTOS {"\n"}
            Los productos presentados en la Plataforma son revisados respecto a los inventarios, en caso de no contar con la existencia de los mismos directamente o en locales aliados, TUPEDIDO.CO no realizará el cobro de producto faltante en la orden de compra y no estará en la obligación de avisar al usuario previamente.{"\n"}
            HORARIOS DE ENTREGA Y COSTO DEL DOMICILIO {"\n"}
            La hora de entrega de una orden de compra dependerá del tipo de servicio solicitado por el usuario express o programado; en caso del express se entiende que la orden de compra será entregada en los próximos 120 minutos después de la generación de esta en la plataforma; para los pedidos programados dependerá de la franja horaria seleccionada por el usuario al momento de la generación de la orden de compra a través de la plataforma, siempre que dicha opción esté disponible. La entrega de los Productos tendrá un costo indicado como costo de domicilio, el cual varía de acuerdo a la franja horaria seleccionada y los beneficios (promo ciones y descuentos) que apliquen sobre el mismo. 
            Para algunas franjas específicas no aplica ningún beneficio o promoción dada su alta demanda; el beneficio de domicilio gratis anunciado en la aplicación, no aplicará en las siguientes franjas:
            Franja de pedido express {"\n"}
            Servicio en el que TUPEDIDO.CO garantiza una entrega del pedido en menos de 120 minutos, para esta franja, el cliente deberá pagar el valor del domicilio completo.{"\n"}
            Franja programada Franjas de entrega en tres horas o menos, la promoción “ganaste domicilio gratis”, aplica, si se alcanza la compra que indica la aplicación para este beneficio.{"\n"}
            PEDIDO MÍNIMO {"\n"}
            TUPEDIDO.CO en su plataforma restringe el valor del pedido mínimo requerido para poder procesar una orden de compra. Este valor será indicado cuando el usuario incluye ítems o productos en el carrito de compras. {"\n"}
            El valor para cumplir la restricción del valor del pedido mínimo no incluye el valor del domicilio.{"\n"}
            PRECIO DE VENTA El precio que se deberá pagar por cada artículo adquirido será el precio vigente en el sitio al momento de hacerse el pedido.{"\n"}
            PAGO DE LA ORDEN DE COMPRA {"\n"}
            Las órdenes de compra podrán pagarse contra entrega en efectivo o datafono.{"\n"}
            ENTREGA DE ORDEN DE COMPRA {"\n"}
            El domiciliario realizará la entrega de la orden de compra en la dirección indicada por el usuario para tal fin, realizará la entrega de los productos verificando el estado de la entrega junto al usuario, en caso de no encontrarse el usuario en la dirección dejará el pedido con un tercero autorizado para tal fin. El domiciliario recibirá el valor de la Orden de Compra.{"\n"}
            CANCELACION Y RETRACTO DE COMPRA{"\n"}
            RETRACTO POR PARTE DEL USUARIO {"\n"}
            Solo se podrá realizar en órdenes de compra programadas, en todo caso el usuario deberá notificar por los canales de contacto ya enunciados en los presentes términos y condiciones de uso en un término no mayor a cinco (5) horas posteriores a la realización de dicha orden de compra, esto, con el fin de tener un margen de reacción a nivel logístico que no signifique un perjuicio ni para el usuario ni para TUPEDIDO.CO.{"\n"}
            RETRACTO POR PARTE DE TUPEDIDO.CO {"\n"}
            TUPEDIDO.CO se reserva el derecho a cancelar pedidos y/o anular beneficios que considere sospechosos de incumplir cualquiera de los términos de este documento y no está en la obligación de notificar previamente al usuario.{"\n"}
            RECLAMACIONES Y SERVICIO AL CLIENTE {"\n"}
            TUPEDIDO.CO recibirá y dará trámite a las solicitudes, peticiones, quejas y reclamos que formule el usuario en las eventualidades que se desprendan del servicio que presta la compañía como cumplimiento en los tiempos de entrega y calidad de los productos entre otros casos. TUPEDIDO.CO tiene control de los servicios y el personal que sea contratado de manera directa como ha sido enunciado en el presente numeral.
            {"\n"}{"\n"}
            Si el usuario tiene alguna duda respecto de los términos y condiciones, política de privacidad, uso de la plataforma o de su perfil, podrá ponerse en contacto con TUPEDIDO.CO escribiendo al correo electrónico servicioalcliente@tupedido.co. Los mensajes serán atendidos en un máximo de 48 horas y resueltos definitivamente en un tiempo de cinco siete (7) según lo establecido por la legislación vigente y por las políticas internas de TUPEDIDO.CO para la atención de PQR.
            {"\n"}{"\n"}
            Reclamación{"\n"}
            El usuario podrá realizar reclamaciones cuando el Producto entregado no corresponda al producto indicado, cuando el producto no se encuentre en el estado indicado en la plataforma o no se haya entregado un producto que se encontraba en la orden de compra, esta podrá realizarla a través de la plataforma o del correo electrónico servicioalcliente@tupedido.co.
            {"\n"}{"\n"}
            REFERIDOS {"\n"}
            A continuación, se detallan los términos y condiciones que se aplicarán al programa de referidos al cual se puede acceder a través de la plataforma.
            {"\n"}{"\n"}
            Usuario nuevo se define como una persona natural o jurídica que nunca ha usado el servicio o realizado la compra de productos de TUPEDIDO.CO.{"\n"}
            El beneficio sólo podrá ser usado una vez por dirección de entrega{"\n"}
            Los usuarios existentes podrán referir familiares y/o amigos a través de su código de referido y recibirán $5.000 pesos en cupón de descuento para su próximo pedido inmediatamente después de que el usuario nuevo haya recibido su primer pedido.{"\n"}
            El código de referido podrá ser compartido por los usuarios existentes cuando éstos han realizado su primera compra.{"\n"}
            Los nuevos usuarios que hayan usado un código válido de referido tendrán un descuento exclusivo para su primera compra por un valor de $5.000 pesos en cupón de descuento aplicable sólo a su primer pedido.{"\n"}
            El cupón de descuento aplica sólo para pedidos mayores a $50.000 pesos sin incluir el costo de domicilio.{"\n"}
            El beneficio aplica exclusivamente para usuarios de acuerdo a la cobertura y será efectivo únicamente si el usuario hace el pedido dentro de la fecha de vigencia del cupón de descuento.{"\n"}
            Un usuario puede referir máximo a 50 usuarios nuevos.   {"\n"}        

        </Text>
        )
    ];

    const onInternalContinue = () => {
        if(isEnabled) {
            onContinue(); 
        }
    }

    const onEnableContinueButton = () => {
        setIsEnabled(true);
    }

    return (
        <Modal      
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
      >
        {   
            <View style={styles.centeredView}
            >
                <View style={styles.modalView}>
                    <View style={{width: '100%', height: '100%', padding: 10}}>
                        <View
                            style={{
                                height: '85%'
                            }}
                        >
                            <FlatList
                                style={{
                                    height: '100%'
                                }}
                                data={components}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => item}   
                                onEndReached={onEnableContinueButton}
                            />
                        </View>
                        <View
                            style={{
                                height: '15%',
                                flexDirection: (Platform.OS == "ios" && !isInternalSignup) ? 'column' : 'row',
                                justifyContent: 'space-around'
                            }}
                        >
                            {
                                (isInternalSignup || Platform.OS != "ios") && 
                                <Button 
                                raised
                                title="Cancelar"
                                onPress={ onCancel }
                                containerStyle= { {
                                    width: "30%",
                                    alignSelf: "center",
                                    flexBasis: "auto",
                                    borderRadius: 10,
                                    height: 40
                                } }
                                buttonStyle= { {
                                    backgroundColor:'#919191'
                                } }
                            />
                            }
                            <Button 
                                    raised
                                    title="Aceptar"
                                    onPress={ onInternalContinue }
                                    containerStyle= { {
                                        width: "30%",
                                        alignSelf: "center",
                                        flexBasis: "auto",
                                        borderRadius: 10,
                                        height: 40
                                    } }
                                    buttonStyle= { {
                                        backgroundColor: isEnabled ? "rgba(249,22,116,1)": '#919191'
                                    } }
                            />                          
                            {
                                (Platform.OS == "ios" && !isInternalSignup) &&
                                <Text
                                    style={{
                                        width: "90%",
                                        alignSelf: "center",
                                        flexBasis: "auto",
                                        borderRadius: 10,
                                        height: 20,
                                        textAlign: 'center'
                                    } }
                                >
                                    Para cancelar, por favor cerrar el app
                                </Text>
                            }
                            
                        </View>
                    </View>
                </View>
            </View>
        }
      </Modal>
      );
}


export default TermsModal;