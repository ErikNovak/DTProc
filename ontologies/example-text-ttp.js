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
                file_name: "../example/file_text.jl",
                file_format: "json"
            }
        }
    ],
    bolts: [
        {
            name: "doc-text-ttp",
            type: "inproc",
            working_dir: "./components/bolts",
            cmd: "text_ttp_bolt.js",
            inputs: [{
                source: "file-reader",
            }],
            init: {
                ttp: {
                    user: config.ttp.user,
                    token: config.ttp.token,
                },
                tmp_folder: "../tmp",
                document_title_path: "title",
                document_language_path: "language",
                document_text_path: "text",
                document_transcriptions_path: "transcriptions",
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
                wikifier: {
                    user_key: config.wikifier.userKey,
                    wikifier_url: config.wikifier.wikifierURL,
                },
                document_text_path: "text",
                document_error_path: "error",
                wikipedia_concept_path: "wiki"
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
                file_name_template: "../example/example_text_ttp_output.jl"
            }
        },
        {
            name: "file-error-listener",
            working_dir: ".",
            type: "sys",
            cmd: "console",
            inputs: [
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
