import React, {useState} from "react";
import {Viewer} from "@react-pdf-viewer/core"; // install this library
import {defaultLayoutPlugin} from "@react-pdf-viewer/default-layout"; // install this library
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import {Worker} from "@react-pdf-viewer/core"; // install this library
import storage from "../../services/storage";

function PDFViewer({pdf}) {
    const [defaultPdf] = useState(pdf);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const handleSwitchTheme = (theme) => {
        storage.set('theme', theme);
    };
    const theme = storage.get('theme') || 'light';
    return (
        <div className="custom-pdf">
            {defaultPdf && (
                <>
                    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js">
                        <Viewer
                            fileUrl={defaultPdf}
                            plugins={[defaultLayoutPluginInstance]}
                            defaultScale={1}
                            onSwitchTheme={handleSwitchTheme}
                            theme={theme}
                        />
                    </Worker>
                </>
            )}
        </div>
    );
}

export default PDFViewer;
