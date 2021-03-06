// configurations
const { default: config } = require("../dist/config/config");

module.exports = {
    general: {
        heartbeat: 2000,
        pass_binary_messages: true
    },
    spouts: [
        {
            name: "file-reader",
            working_dir: ".",
            type: "sys",
            cmd: "file_reader",
            init: {
                file_name: "../example/file_urls.jl",
                file_format: "json"
            }
        }
    ],
    bolts: [
        {
            name: "doc-type",
            type: "inproc",
            working_dir: "./components/bolts",
            cmd: "doc_type_bolt.js",
            inputs: [{
                source: "file-reader",
            }],
            init: {
                document_location_path: "url",
                document_type_path: "type"
            }
        },
        {
            name: "doc-text",
            type: "inproc",
            working_dir: "./components/bolts",
            cmd: "text_bolt.js",
            inputs: [{
                source: "doc-type",
            }],
            init: {
                textract_config: {
                    preserve_line_breaks: false,
                    preserve_only_multiple_line_breaks: false,
                    include_alt_text: false
                },
                document_location_path: "url",
                document_type_path: "type",
                document_text_path: "metadata.text",
            }
        },
        {
            name: "doc-text-ttp",
            type: "inproc",
            working_dir: "./components/bolts",
            cmd: "text_ttp_bolt.js",
            inputs: [{
                source: "doc-text",
            }],
            init: {
                ttp: {
                    user: config.ttp.user,
                    token: config.ttp.token,
                },
                tmp_folder: "../tmp",
                document_title_path: "title",
                document_language_path: "language",
                document_text_path: "metadata.text",
                document_transcriptions_path: "metadata.transcriptions",
                document_error_path: "error",
                ttp_id_path: "ttp_id"
            }
        },
        {
            name: "wikipedia",
            type: "inproc",
            working_dir: "./components/bolts",
            cmd: "wikipedia_bolt.js",
            inputs: [{
                source: "doc-text-ttp",
            }],
            init: {
                // wikifier related configurations
                wikifier: {
                    user_key: config.wikifier.userKey,
                    wikifier_url: config.wikifier.wikifierURL,
                    max_length: 10000
                },
                document_text_path: "metadata.text",
                wikipedia_concept_path: "metadata.wiki",
                document_error_path: "error"
            }
        },
        {
            name: "file-append",
            working_dir: ".",
            type: "sys",
            cmd: "file_append",
            inputs: [
                { source: "wikipedia" }
            ],
            init: {
                file_name_template: "../example/example_url_ttp_output.jl"
            }
        },
        {
            name: "file-error-listener",
            working_dir: ".",
            type: "sys",
            cmd: "console",
            inputs: [
                {
                    source: "doc-type",
                    stream_id: "stream_error"
                },
                {
                    source: "doc-text",
                    stream_id: "stream_error"
                },
                {
                    source: "doc-text-ttp",
                    stream_id: "stream_error"
                },
                {
                    source: "wikipedia",
                    stream_id: "stream_error"
                }
            ],
            init: {}
        }

    ],
    variables: {}
};
