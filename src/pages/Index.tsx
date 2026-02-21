import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Navbar } from '@/components/Layout/Navbar';
import { EditorPane } from '@/components/Editor/EditorPane';
import { PreviewPane } from '@/components/Preview/PreviewPane';
import { DropZone } from '@/components/Layout/DropZone';
import { useEditorStore } from '@/store/editorStore';
import { ProfileFAB } from '@/components/Profile/ProfileFAB';

const Index = () => {
  const { viewMode } = useEditorStore();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <DropZone>
        <div className="flex-1 min-h-0">
          {viewMode === 'editor' && <EditorPane />}
          {viewMode === 'preview' && <PreviewPane />}
          {viewMode === 'split' && (
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={50} minSize={25}>
                <EditorPane />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={25}>
                <PreviewPane />
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </div>
      </DropZone>
      <ProfileFAB />
    </div>
  );
};

export default Index;
