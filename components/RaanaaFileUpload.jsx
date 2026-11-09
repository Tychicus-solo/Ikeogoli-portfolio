"use client";

import Image from "next/image";
import RaanaaFileTypeIcon from "./RaanaaFileTypeIcon";
import { useEffect, useId, useRef, useState } from "react";

const MAX_FILES = 3;
const MAX_SIZE = 50 * 1024 * 1024;
const asset = name => `/assets/case-studies/raanaa/playground/${name}`;
const formatSize = size => size >= 1024 * 1024 ? `${(size / (1024 * 1024)).toFixed(1)} MB` : `${Math.ceil(size / 1024)} KB`;

export default function RaanaaFileUpload({ mode }) {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [failedPreviews, setFailedPreviews] = useState(() => new Set());
  const [announcement, setAnnouncement] = useState("");
  const [limitMessage, setLimitMessage] = useState("");
  const input = useRef(null);
  const urls = useRef(new Set());
  const counter = useRef(0);
  const dragDepth = useRef(0);
  const id = useId();
  const uploading = files.some(file => file.status === "uploading");

  useEffect(() => {
    if (!uploading) return;
    const interval = window.setInterval(() => setFiles(current => current.map(file => {
      if (file.status !== "uploading") return file;
      const progress = Math.min(100, file.progress + 10);
      return { ...file, progress, status: progress === 100 ? "complete" : "uploading" };
    })), 500);
    return () => window.clearInterval(interval);
  }, [uploading]);

  useEffect(() => {
    const previews = urls.current;
    return () => previews.forEach(url => URL.revokeObjectURL(url));
  }, []);

  const addFiles = incoming => {
    const available = Math.max(0, MAX_FILES - files.length);
    const incomingFiles = Array.from(incoming);
    if (!incomingFiles.length) return;
    const overflow = incomingFiles.length > available;
    setLimitMessage(overflow ? "You can add up to 3 files. Remove a file to add another." : "");
    if (!available) {
      setAnnouncement("Maximum of 3 files reached. Remove a file to add another.");
      return;
    }
    const additions = incomingFiles.slice(0, available).map((file, index) => {
      const validType = /\.(jpe?g|png|pdf|mp4)$/i.test(file.name);
      const error = !validType ? "Use a JPEG, PNG, PDF or MP4 file." : file.size > MAX_SIZE ? "File exceeds the 50 MB limit." : !file.size ? "This file is empty." : null;
      const simulatedError = !error && files.length + index === 2;
      const preview = !error && /^image\/(jpeg|png)$/.test(file.type) ? URL.createObjectURL(file) : null;
      if (preview) urls.current.add(preview);
      return { id: `${id}-${++counter.current}`, name: file.name, size: file.size, progress: 0, status: error || simulatedError ? "error" : "uploading", error: error || (simulatedError ? "There was an error here" : null), preview, retryable: simulatedError };
    });
    setFiles(current => [...current, ...additions].slice(0, MAX_FILES));
    setAnnouncement(`${additions.length} file${additions.length === 1 ? "" : "s"} added. ${additions.filter(file => file.error).length} rejected.`);
  };
  const remove = file => {
    if (file.preview) { URL.revokeObjectURL(file.preview); urls.current.delete(file.preview); }
    setFiles(current => current.filter(entry => entry.id !== file.id));
    setFailedPreviews(current => {
      if (!current.has(file.id)) return current;
      const next = new Set(current);
      next.delete(file.id);
      return next;
    });
    setLimitMessage("");
    setAnnouncement(`${file.name} removed.`);
  };
  const retry = file => {
    setFiles(current => current.map(entry => entry.id === file.id ? { ...entry, progress: 0, status: "uploading", error: null } : entry));
    setAnnouncement(`Retrying ${file.name}.`);
  };

  return <div className="raanaa-file-upload" data-has-files={files.length > 0} role="region" aria-label="File upload area" tabIndex={0}>
    <input className="sr-only" ref={input} type="file" multiple accept=".jpg,.jpeg,.png,.pdf,.mp4" tabIndex={-1} aria-label="Choose files for upload demo"
      onChange={event => { addFiles(event.target.files); event.target.value = ""; }} />
    <div className="raanaa-upload-dropzone" data-dragging={dragging}
      onDragEnter={event => { event.preventDefault(); dragDepth.current++; setDragging(true); }}
      onDragOver={event => { event.preventDefault(); event.dataTransfer.dropEffect = "copy"; }}
      onDragLeave={event => { event.preventDefault(); dragDepth.current = Math.max(0, dragDepth.current - 1); if (!dragDepth.current) setDragging(false); }}
      onDrop={event => { event.preventDefault(); dragDepth.current = 0; setDragging(false); addFiles(event.dataTransfer.files); }}>
      <span className="raanaa-upload-featured"><Image src={asset(`upload-${mode.toLowerCase()}-cloud.svg`)} width={mode === "Light" ? 24 : 20} height={mode === "Light" ? 24 : 20} alt="" /></span>
      <div><p>Choose a file or drag &amp; drop it here.</p><small id={`${id}-formats`}>JPEG, PNG, PDF, AND MP4 FORMATS, UP TO 50 MB. MAXIMUM 3 FILES.</small></div>
      <button type="button" aria-describedby={`${id}-formats`} disabled={files.length >= MAX_FILES} onClick={() => input.current?.click()}>Browse file</button>
    </div>
    {limitMessage && <p className="raanaa-upload-limit" role="status">{limitMessage}</p>}
    <ul className="raanaa-upload-list" aria-label="Files">
      {files.map(file => <li key={file.id} data-status={file.status}>
        <div className="raanaa-upload-thumbnail" data-file-icon={!file.preview || failedPreviews.has(file.id)}>
          {file.preview && !failedPreviews.has(file.id) ? <Image src={file.preview} width={56} height={56} unoptimized alt=""
            onError={() => setFailedPreviews(current => new Set([...current, file.id]))} /> : <RaanaaFileTypeIcon name={file.name} mode={mode} />}
        </div>
        <div className="raanaa-upload-file-info"><p title={file.name}>{file.name}</p>
          {file.status === "error" ? <p className="raanaa-upload-error">{file.error}</p> : <small>{file.status === "complete" ? `${formatSize(file.size)} · Completed` : `${formatSize(file.size * file.progress / 100)} of ${formatSize(file.size)} · Uploading...`}</small>}
          {file.status === "uploading" && <div className="raanaa-upload-progress" role="progressbar" aria-label={`${file.name} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={file.progress}><span style={{ width: `${file.progress}%` }} /></div>}
        </div>
        {file.status === "error" && file.retryable && <button type="button" className="raanaa-upload-retry" onClick={() => retry(file)}>Try again</button>}
        <button type="button" className="raanaa-upload-remove" aria-label={`Remove ${file.name}`} onClick={() => remove(file)}><Image src={asset(`upload-${mode.toLowerCase()}-remove.svg`)} width={20} height={20} alt="" /></button>
      </li>)}
    </ul>
    <span className="sr-only" role="status">{announcement}</span>
  </div>;
}
