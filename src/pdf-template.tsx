import React from "react";
import ReactPDF, {
  Page,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

type PDFProps = {
  file: any;
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 600,
    color: "#131925",
    marginBottom: 8,
  },
  statement: {
    fontSize: 20,
    color: "#131925",
    lineHeight: 1.4,
    marginBottom: 4,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#999999",
    margin: "24px 0 24px 0",
  },
  paragraph: {
    fontSize: 12,
    color: "#212935",
    lineHeight: 1.67,
  },
  columnParent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnStart: {
    flex: 1,
  },
  columnEnd: {
    flex: 1,
    alignItems: "flex-end",
  },
  image: {
    width: 550,
  },
});

const PDF: React.FC<PDFProps> = ({ file }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.columnParent}>
            <View style={styles.columnStart}>
              <Image style={styles.image} src={file.data}></Image>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default async (file: any) => {
  return await ReactPDF.renderToStream(<PDF {...{ file }} />);
};
