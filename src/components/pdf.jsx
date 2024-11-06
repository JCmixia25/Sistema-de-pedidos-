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
  // Nuevos estilos para las columnas fijas
  productColumn: {
    padding: 5,
  },
  productName: {
    flexBasis: '50%', // 50% del espacio para el nombre del producto
    paddingRight: 10,  // Espacio entre el nombre y la cantidad
  },
  productQuantity: {
    flexBasis: '20%', // 20% del espacio para la cantidad
    textAlign: 'center',  // Alinear cantidad al centro
  },
  productPrice: {
    flexBasis: '30%', // 30% del espacio para el precio
    textAlign: 'right', // Alinear precio a la derecha
  },
});

const PdfDocument = ({ product, productos, total }) => {
  const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount); // Convertir a número
    if (!isNaN(numAmount)) {
      const formattedAmount = numAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return formattedAmount;
    } else {
      return amount; // Retornar el valor original si no es un número
    }
  };
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
            <Text style={styles.productName}>Producto</Text>
            <Text style={styles.productQuantity}>Cantidad</Text>
            <Text style={styles.productPrice}>Precio</Text>
          </View>

          {/* Filas de Productos */}
          {productos.map((producto) => (
            <View key={producto.id} style={styles.productRow}>
              <View style={[styles.productColumn, styles.productName]}>
                <Text>{producto.titulo}</Text>
              </View>
              <View style={[styles.productColumn, styles.productQuantity]}>
                <Text>{producto.cantidad}</Text>
              </View>
              <View style={[styles.productColumn, styles.productPrice]}>
                <Text>Q {formatCurrency(producto.precio * producto.cantidad)}</Text>
              </View>
            </View>
          ))}
          <View style={styles.doubleSpace} />
          {/* Total */}
          <View style={styles.productRow}>
            <Text style={styles.boldText}>Total</Text>
            <Text></Text> {/* Espacio vacío para alinear el total a la derecha */}
            <Text style={styles.boldText}>Q{formatCurrency(total)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
