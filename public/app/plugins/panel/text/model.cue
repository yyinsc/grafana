package "text" // ?? package name == pluginId?  (typically: $org-name-$type)

TextMode: "html" | "markdown" @cuetsy(targetType="enum")

Options: {
  mode: TextMode = "markdown"
  content: string = `# Title

For markdown syntax help: [commonmark.org/help](https://commonmark.org/help/)
`
} @cuetsy(targetType="interface")
