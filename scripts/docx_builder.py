import zipfile
import xml.sax.saxutils as saxutils
import os

def esc(text):
    return saxutils.escape(str(text))

class DocxBuilder:
    def __init__(self):
        self.body_elements = []

    def p(self, text, bold=False, italic=False, color=None, size=None, align=None, before=80, after=80, line=276):
        rPr_items = []
        if bold:
            rPr_items.append('<w:b/>')
        if italic:
            rPr_items.append('<w:i/>')
        if color:
            rPr_items.append(f'<w:color w:val="{color}"/>')
        if size:
            rPr_items.append(f'<w:sz w:val="{size}"/>')
            rPr_items.append(f'<w:szCs w:val="{size}"/>')
        rPr = f"<w:rPr>{''.join(rPr_items)}</w:rPr>" if rPr_items else ""

        pPr_items = []
        if align:
            pPr_items.append(f'<w:jc w:val="{align}"/>')
        pPr_items.append(f'<w:spacing w:before="{before}" w:after="{after}" w:line="{line}" w:lineRule="auto"/>')
        pPr = f"<w:pPr>{''.join(pPr_items)}</w:pPr>"

        xml = f'<w:p>{pPr}<w:r>{rPr}<w:t xml:space="preserve">{esc(text)}</w:t></w:r></w:p>'
        self.body_elements.append(xml)

    def heading(self, text, level=1):
        colors = {1: '0F3B66', 2: '1E5F8A', 3: '2D749B', 4: '3A506B'}
        sizes = {1: 34, 2: 28, 3: 24, 4: 22}
        befores = {1: 320, 2: 240, 3: 180, 4: 120}
        afters = {1: 120, 2: 80, 3: 60, 4: 60}

        c = colors.get(level, '0F3B66')
        s = sizes.get(level, 24)
        bf = befores.get(level, 160)
        af = afters.get(level, 80)

        xml = f'''<w:p>
  <w:pPr>
    <w:pStyle w:val="Heading{level}"/>
    <w:spacing w:before="{bf}" w:after="{af}"/>
  </w:pPr>
  <w:r>
    <w:rPr>
      <w:b/>
      <w:color w:val="{c}"/>
      <w:sz w:val="{s}"/>
      <w:szCs w:val="{s}"/>
    </w:rPr>
    <w:t xml:space="preserve">{esc(text)}</w:t>
  </w:r>
</w:p>'''
        self.body_elements.append(xml)

    def bullet(self, title, desc="", bold_title=True):
        xml = f'''<w:p>
  <w:pPr>
    <w:ind w:left="420" w:hanging="260"/>
    <w:spacing w:before="60" w:after="60" w:line="270" w:lineRule="auto"/>
  </w:pPr>
  <w:r>
    <w:rPr>
      <w:rFonts w:ascii="Segoe UI" w:hAnsi="Segoe UI"/>
      <w:color w:val="2563EB"/>
      <w:b/>
    </w:rPr>
    <w:t xml:space="preserve">● </w:t>
  </w:r>
  <w:r>
    <w:rPr>
      <w:b/>
      <w:color w:val="0F172A"/>
    </w:rPr>
    <w:t xml:space="preserve">{esc(title)} </w:t>
  </w:r>
  <w:r>
    <w:rPr>
      <w:color w:val="334155"/>
    </w:rPr>
    <w:t xml:space="preserve">{esc(desc)}</w:t>
  </w:r>
</w:p>'''
        self.body_elements.append(xml)

    def code_box(self, code_lines):
        p_list = []
        for line in code_lines:
            line_esc = esc(line)
            # check if line is a comment
            is_comment = line.strip().startswith('#')
            col = "059669" if is_comment else "1E293B"
            bold_tag = "<w:i/>" if is_comment else ""

            p_list.append(f'''<w:p>
  <w:pPr>
    <w:spacing w:before="10" w:after="10" w:line="240" w:lineRule="auto"/>
  </w:pPr>
  <w:r>
    <w:rPr>
      <w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/>
      <w:sz w:val="19"/>
      <w:szCs w:val="19"/>
      <w:color w:val="{col}"/>
      {bold_tag}
    </w:rPr>
    <w:t xml:space="preserve">{line_esc}</w:t>
  </w:r>
</w:p>''')
        inner_content = "".join(p_list)

        xml = f'''<w:tbl>
  <w:tblPr>
    <w:tblW w:w="9400" w:type="dxa"/>
    <w:tblBorders>
      <w:top w:val="none"/>
      <w:left w:val="single" w:sz="36" w:space="0" w:color="2563EB"/>
      <w:bottom w:val="none"/>
      <w:right w:val="none"/>
    </w:tblBorders>
    <w:tblCellMar>
      <w:top w:w="120" w:type="dxa"/>
      <w:left w:w="180" w:type="dxa"/>
      <w:bottom w:w="120" w:type="dxa"/>
      <w:right w:w="180" w:type="dxa"/>
    </w:tblCellMar>
  </w:tblPr>
  <w:tr>
    <w:tc>
      <w:tcPr>
        <w:tcW w:w="9400" w:type="dxa"/>
        <w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/>
      </w:tcPr>
      {inner_content}
    </w:tc>
  </w:tr>
</w:tbl>
<w:p><w:pPr><w:spacing w:before="40" w:after="80"/></w:pPr></w:p>'''
        self.body_elements.append(xml)

    def alert_box(self, title, message, kind='NOTE'):
        colors = {
            'NOTE': ('0284C7', 'F0F9FF', 'LƯU Ý QUAN TRỌNG'),
            'WARNING': ('D97706', 'FFFBEB', 'CẢNH BÁO'),
            'DANGER': ('DC2626', 'FEF2F2', 'NGUY CƠ XUNG ĐỘT'),
            'TIP': ('16A34A', 'F0FDF4', 'MẸO THỰC HÀNH')
        }
        border_col, bg_col, default_title = colors.get(kind, colors['NOTE'])
        box_title = title if title else default_title

        xml = f'''<w:tbl>
  <w:tblPr>
    <w:tblW w:w="9400" w:type="dxa"/>
    <w:tblBorders>
      <w:top w:val="none"/>
      <w:left w:val="single" w:sz="36" w:space="0" w:color="{border_col}"/>
      <w:bottom w:val="none"/>
      <w:right w:val="none"/>
    </w:tblBorders>
    <w:tblCellMar>
      <w:top w:w="140" w:type="dxa"/>
      <w:left w:w="200" w:type="dxa"/>
      <w:bottom w:w="140" w:type="dxa"/>
      <w:right w:w="200" w:type="dxa"/>
    </w:tblCellMar>
  </w:tblPr>
  <w:tr>
    <w:tc>
      <w:tcPr>
        <w:tcW w:w="9400" w:type="dxa"/>
        <w:shd w:val="clear" w:color="auto" w:fill="{bg_col}"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:spacing w:before="20" w:after="40"/>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:b/>
            <w:color w:val="{border_col}"/>
            <w:sz w:val="22"/>
          </w:rPr>
          <w:t xml:space="preserve">[{esc(box_title)}] </w:t>
        </w:r>
        <w:r>
          <w:rPr>
            <w:sz w:val="21"/>
            <w:color w:val="334155"/>
          </w:rPr>
          <w:t xml:space="preserve">{esc(message)}</w:t>
        </w:r>
      </w:p>
    </w:tc>
  </w:tr>
</w:tbl>
<w:p><w:pPr><w:spacing w:before="40" w:after="80"/></w:pPr></w:p>'''
        self.body_elements.append(xml)

    def table(self, headers, rows, col_widths=None):
        if not col_widths:
            w = 9400 // len(headers)
            col_widths = [w] * len(headers)
        total_w = sum(col_widths)

        grid_cols = "".join([f'<w:gridCol w:w="{w}"/>' for w in col_widths])

        header_cells = []
        for i, h in enumerate(headers):
            w = col_widths[i]
            header_cells.append(f'''<w:tc>
  <w:tcPr>
    <w:tcW w:w="{w}" w:type="dxa"/>
    <w:shd w:val="clear" w:color="auto" w:fill="0F3B66"/>
    <w:vAlign w:val="center"/>
  </w:tcPr>
  <w:p>
    <w:pPr>
      <w:jc w:val="center"/>
      <w:spacing w:before="80" w:after="80"/>
    </w:pPr>
    <w:r>
      <w:rPr>
        <w:b/>
        <w:color w:val="FFFFFF"/>
        <w:sz w:val="21"/>
      </w:rPr>
      <w:t xml:space="preserve">{esc(h)}</w:t>
    </w:r>
  </w:p>
</w:tc>''')
        tr_header = f'''<w:tr>
  <w:trPr>
    <w:tblHeader/>
  </w:trPr>
  {"".join(header_cells)}
</w:tr>'''

        body_rows = []
        for r_idx, row in enumerate(rows):
            bg = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
            cells = []
            for i, val in enumerate(row):
                w = col_widths[i]
                align = "center" if i == 0 or len(val) < 8 else "left"
                # Support newlines in table cell values
                paragraphs = []
                lines = str(val).split("\n")
                for line in lines:
                    paragraphs.append(f'''<w:p>
  <w:pPr>
    <w:jc w:val="{align}"/>
    <w:spacing w:before="30" w:after="30" w:line="240" w:lineRule="auto"/>
  </w:pPr>
  <w:r>
    <w:rPr>
      <w:sz w:val="20"/>
      <w:color w:val="1E293B"/>
    </w:rPr>
    <w:t xml:space="preserve">{esc(line)}</w:t>
  </w:r>
</w:p>''')
                cells.append(f'''<w:tc>
  <w:tcPr>
    <w:tcW w:w="{w}" w:type="dxa"/>
    <w:shd w:val="clear" w:color="auto" w:fill="{bg}"/>
    <w:vAlign w:val="center"/>
  </w:tcPr>
  {"".join(paragraphs)}
</w:tc>''')
            body_rows.append(f'<w:tr>{"".join(cells)}</w:tr>')

        xml = f'''<w:tbl>
  <w:tblPr>
    <w:tblW w:w="{total_w}" w:type="dxa"/>
    <w:tblBorders>
      <w:top w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
      <w:left w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
      <w:bottom w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
      <w:right w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
      <w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>
      <w:insideV w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>
    </w:tblBorders>
    <w:tblCellMar>
      <w:top w:w="100" w:type="dxa"/>
      <w:left w:w="120" w:type="dxa"/>
      <w:bottom w:w="100" w:type="dxa"/>
      <w:right w:w="120" w:type="dxa"/>
    </w:tblCellMar>
  </w:tblPr>
  <w:tblGrid>
    {grid_cols}
  </w:tblGrid>
  {tr_header}
  {"".join(body_rows)}
</w:tbl>
<w:p><w:pPr><w:spacing w:before="40" w:after="100"/></w:pPr></w:p>'''
        self.body_elements.append(xml)

    def save(self, filepath):
        content_types = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
  <Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>'''

        rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>'''

        doc_rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" Target="fontTable.xml"/>
</Relationships>'''

        styles = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Segoe UI" w:hAnsi="Segoe UI" w:cs="Segoe UI"/>
        <w:sz w:val="23"/>
        <w:szCs w:val="23"/>
        <w:color w:val="1E293B"/>
        <w:lang w:val="vi-VN"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:pPr><w:spacing w:before="360" w:after="140"/></w:pPr>
    <w:rPr><w:b/><w:color w:val="0F3B66"/><w:sz w:val="34"/><w:szCs w:val="34"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:basedOn w:val="Normal"/>
    <w:pPr><w:spacing w:before="260" w:after="100"/></w:pPr>
    <w:rPr><w:b/><w:color w:val="1E5F8A"/><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading3">
    <w:name w:val="heading 3"/>
    <w:basedOn w:val="Normal"/>
    <w:pPr><w:spacing w:before="200" w:after="80"/></w:pPr>
    <w:rPr><w:b/><w:color w:val="2D749B"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr>
  </w:style>
</w:styles>'''

        settings = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"/>'''

        font_table = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:fontTable xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:font w:name="Segoe UI"/>
  <w:font w:name="Consolas"/>
  <w:font w:name="Calibri"/>
</w:fontTable>'''

        core_props = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Huong Dan Day Code GitHub Tung Thanh Vien</dc:title>
  <dc:creator>BTL CTDL&amp;GT - De tai 04</dc:creator>
  <cp:lastModifiedBy>Antigravity AI</cp:lastModifiedBy>
</cp:coreProperties>'''

        app_props = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">
  <Application>Microsoft Office Word</Application>
</Properties>'''

        body_xml = "".join(self.body_elements)
        sect_pr = '''<w:sectPr>
  <w:pgSz w:w="11906" w:h="16838"/>
  <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
</w:sectPr>'''
        doc_xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    {body_xml}
    {sect_pr}
  </w:body>
</w:document>'''

        os.makedirs(os.path.dirname(os.path.abspath(filepath)), exist_ok=True)
        with zipfile.ZipFile(filepath, 'w', zipfile.ZIP_DEFLATED) as z:
            z.writestr('[Content_Types].xml', content_types)
            z.writestr('_rels/.rels', rels)
            z.writestr('word/_rels/document.xml.rels', doc_rels)
            z.writestr('word/styles.xml', styles)
            z.writestr('word/settings.xml', settings)
            z.writestr('word/fontTable.xml', font_table)
            z.writestr('docProps/core.xml', core_props)
            z.writestr('docProps/app.xml', app_props)
            z.writestr('word/document.xml', doc_xml)

        print(f"Generated {filepath} successfully.")
