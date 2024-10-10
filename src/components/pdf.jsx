import { StyleSheet, View, Text, Page, Document, Image } from '@react-pdf/renderer';
import React from 'react';
import icono from "./icono.png"; // Logo o ícono

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    marginBottom: 5,
  },
  productRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  logo: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    marginBottom: 20,
  },
});

const PdfDocument = ({ product, productos, total }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={icono} style={styles.logo} />
          <Text>Comprobante de Pedido</Text>
        </View>

        {/* Información del Cliente */}
        <View style={styles.section}>
          <Text style={styles.boldText}>Datos del Cliente:</Text>
          <Text style={styles.text}>Nombres: {product.nombres}</Text>
          <Text style={styles.text}>Apellidos: {product.apellidos}</Text>
          <Text style={styles.text}>Departamento: {product.departamento}</Text>
          <Text style={styles.text}>Ciudad: {product.ciudad}</Text>
          <Text style={styles.text}>Dirección: {product.direccion}</Text>
          <Text style={styles.text}>Teléfono: {product.telefono}</Text>
          <Text style={styles.text}>Correo: {product.email}</Text>
          <Text style={styles.text}>NIT: {product.nit || 'N/A'}</Text>
        </View>

        {/* Resumen del Pedido */}
        <View style={styles.section}>
          <Text style={styles.boldText}>Resumen del Pedido:</Text>
          {productos.map((producto) => (
            <View key={producto.id} style={styles.productRow}>
              <Text>{producto.nombre} (x{producto.cantidad})</Text>
              <Text>Q{producto.precio * producto.cantidad}</Text>
            </View>
          ))}
          <Text style={styles.boldText}>Total: Q{total}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
