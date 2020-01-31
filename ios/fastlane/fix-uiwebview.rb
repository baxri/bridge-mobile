require 'xcodeproj'

react_project = Xcodeproj::Project.open("../../node_modules/react-native/React/React.xcodeproj")
react_project.main_group["React/Views"].files.each do |file|
  if file.path.match(/^RCTWebView/) 
    file.remove_from_project
  end   
end   
react_project.save