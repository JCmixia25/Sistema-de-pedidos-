import { StyleSheet, View, Text, Page, Document, Image } from '@react-pdf/renderer';
import React from 'react';
import icono from "./icono.png"; // Logo o ícono

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
  },
  informacionempresa: {
    textAlign: 'right',
  },
  section: {
    marginBottom: 10,
  },
  text: {
    marginBottom: 5,
    fontFamily: 'Helvetica', // Aplicar fuente sans-serif
  },
  productRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontFamily: 'Courier', // Aplicar estilo teletype
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    fontFamily: 'Times-Roman', // Aplicar fuente Roman
    fontWeight: "bold", // Mantener en negrita
  },
  boldText: {
    fontWeight: "bold",
    fontFamily: 'Times-Roman', // Negrita con estilo Roman
  },
  doubleSpace: {
    marginBottom: 20,
  },
});

const PdfDocument = ({ product, productos, total }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado: Logo e Información de la Empresa */}
        <View style={styles.header}>
          <Image src={icono} style={styles.logo} />
          <View style={styles.informacionempresa}>
            <Text>PEDIDOS PERSIA</Text>
            <Text>Persia@gmail.com</Text>
          </View>
        </View>

        {/* Información del Cliente */}
        <View style={styles.section}>
          <Text style={styles.boldText}>Datos del Cliente:</Text>
          <Text style={styles.text}>Nombres: {product.nombres}</Text>
          <Text style={styles.text}>Apellidos: {product.apellidos}</Text>
          <Text style={styles.text}>Departamento: {product.departamento}</Text>
          <Text style={styles.text}>municipio: {product.municipio}</Text>
          <Text style={styles.text}>Dirección: {product.direccion}</Text>
          <Text style={styles.text}>Teléfono: {product.telefono}</Text>
          <Text style={styles.text}>Correo: {product.email}</Text>
          <Text style={styles.text}>NIT: {product.nit || 'N/A'}</Text>
        </View>

        {/* Salto de Línea Doble */}
        <View style={styles.doubleSpace} />

        {/* Encabezado del Resumen del Pedido */}
        <View style={styles.section}>
          <Text style={styles.boldText}>Resumen del Pedido:</Text>
          <View style={styles.doubleSpace} />
          {/* Encabezados de la Tabla */}
          <View style={styles.tableHeader}>
            <Text>Producto</Text>
            <Text>Cantidad</Text>
            <Text>Precio</Text>
          </View>

          {/* Filas de Productos */}
          {productos.map((producto) => (
            <View key={producto.id} style={styles.productRow}>
              <Text>{producto.titulo}</Text>
              <Text>{producto.cantidad}</Text>
              <Text>Q{producto.precio * producto.cantidad}</Text>
            </View>
          ))}
          <View style={styles.doubleSpace} />
          {/* Total */}
          <View style={styles.productRow}>
            <Text style={styles.boldText}>Total</Text>
            <Text></Text> {/* Espacio vacío para alinear el total a la derecha */}
            <Text style={styles.boldText}>Q{total}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
